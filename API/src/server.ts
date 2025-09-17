import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import multipart from '@fastify/multipart';
import jwt from '@fastify/jwt';

// Routes
import listingsRoutes from './routes/listings';
import categoriesRoutes from './routes/categories';
import usersRoutes from './routes/users';
import authRoutes from './routes/auth';
import searchRoutes from './routes/search';

// Environment configuration
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const HOST = process.env.HOST || '0.0.0.0';
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Create Fastify instance
const server: FastifyInstance = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV === 'development' ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    } : undefined,
  },
});

// Register plugins
async function registerPlugins() {
  // Security and CORS
  await server.register(helmet, {
    contentSecurityPolicy: false, // Disable for API
  });

  await server.register(cors, {
    origin: process.env.NODE_ENV === 'production'
      ? ['https://yourapp.com'] // Replace with your production domain
      : true, // Allow all origins in development
    credentials: true,
  });

  // Rate limiting
  await server.register(rateLimit, {
    max: 100, // Maximum 100 requests
    timeWindow: '1 minute', // Per minute
    errorResponseBuilder: (request, context) => {
      return {
        code: 429,
        error: 'Too Many Requests',
        message: `Rate limit exceeded, retry in ${context.after}`,
        expiresIn: context.after,
      };
    },
  });

  // JWT authentication
  await server.register(jwt, {
    secret: JWT_SECRET,
    sign: {
      expiresIn: '1h', // Access token expires in 1 hour
    },
  });

  // File uploads
  await server.register(multipart, {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100,     // Max field value size in bytes
      fields: 10,         // Max number of non-file fields
      fileSize: 5000000,  // 5MB max file size
      files: 5,           // Max number of file fields
      headerPairs: 2000,  // Max number of header key=>value pairs
    },
  });

  // API Documentation
  await server.register(swagger, {
    swagger: {
      info: {
        title: 'FutureClassifieds API',
        description: 'API for the futuristic classified ads platform',
        version: '1.0.0',
      },
      host: process.env.NODE_ENV === 'production'
        ? 'api.futureclassifieds.com'
        : `localhost:${PORT}`,
      schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
      consumes: ['application/json', 'multipart/form-data'],
      produces: ['application/json'],
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Enter: Bearer <token>',
        },
      },
    },
  });

  await server.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next(); },
      preHandler: function (request, reply, next) { next(); },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
    transformSpecificationClone: true,
  });
}

// Register routes
async function registerRoutes() {
  // Health check endpoint
  server.get('/health', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  });

  // API routes
  await server.register(authRoutes, { prefix: '/api/auth' });
  await server.register(usersRoutes, { prefix: '/api/users' });
  await server.register(categoriesRoutes, { prefix: '/api/categories' });
  await server.register(listingsRoutes, { prefix: '/api/listings' });
  await server.register(searchRoutes, { prefix: '/api/search' });

  // 404 handler
  server.setNotFoundHandler(async (request, reply) => {
    reply.code(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: `Route ${request.method}:${request.url} not found`,
    });
  });

  // Global error handler
  server.setErrorHandler(async (error, request, reply) => {
    server.log.error(error);

    // Validation errors
    if (error.validation) {
      return reply.code(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Validation failed',
        details: error.validation,
      });
    }

    // JWT errors
    if (error.message.includes('jwt') || error.message.includes('token')) {
      return reply.code(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      });
    }

    // Database errors
    if (error.code?.startsWith('P')) { // Prisma error codes
      return reply.code(500).send({
        statusCode: 500,
        error: 'Database Error',
        message: 'A database error occurred',
      });
    }

    // Default error response
    const statusCode = error.statusCode || 500;
    return reply.code(statusCode).send({
      statusCode,
      error: error.name || 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
    });
  });
}

// Graceful shutdown
async function gracefulShutdown() {
  try {
    await server.close();
    server.log.info('Server closed successfully');
    process.exit(0);
  } catch (error) {
    server.log.error('Error during shutdown:', error);
    process.exit(1);
  }
}

// Start server
async function start() {
  try {
    // Register plugins and routes
    await registerPlugins();
    await registerRoutes();

    // Start server
    await server.listen({ port: PORT, host: HOST });

    server.log.info(`🚀 Server running on http://${HOST}:${PORT}`);
    server.log.info(`📚 API Documentation: http://${HOST}:${PORT}/docs`);
    server.log.info(`🏥 Health Check: http://${HOST}:${PORT}/health`);

    // Handle graceful shutdown
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    server.log.error('Error starting server:', error);
    process.exit(1);
  }
}

// Start the server
if (require.main === module) {
  start();
}

export default server;
