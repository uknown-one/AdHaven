use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Car,
  Home,
  Briefcase,
  Smartphone,
  ShoppingBag,
  GraduationCap,
  Heart,
  Wrench,
  Camera,
  Gamepad2,
  Baby,
  Music,
} from "lucide-react";

export function CategoriesSection() {
  const categories = [
    {
      id: "vehicles",
      name: "Vehicles",
      icon: Car,
      count: "15,432",
      color: "from-blue-500 to-cyan-500",
      description: "Cars, motorcycles, boats & more"
    },
    {
      id: "real-estate",
      name: "Real Estate",
      icon: Home,
      count: "8,921",
      color: "from-green-500 to-emerald-500",
      description: "Homes, apartments, commercial"
    },
    {
      id: "jobs",
      name: "Jobs",
      icon: Briefcase,
      count: "12,765",
      color: "from-purple-500 to-pink-500",
      description: "Employment opportunities"
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: Smartphone,
      count: "23,156",
      color: "from-orange-500 to-red-500",
      description: "Phones, computers, gadgets"
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: ShoppingBag,
      count: "18,432",
      color: "from-pink-500 to-rose-500",
      description: "Clothing, accessories, shoes"
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      count: "5,678",
      color: "from-indigo-500 to-blue-500",
      description: "Courses, tutoring, books"
    },
    {
      id: "health",
      name: "Health & Beauty",
      icon: Heart,
      count: "7,234",
      color: "from-red-500 to-pink-500",
      description: "Wellness, beauty, fitness"
    },
    {
      id: "services",
      name: "Services",
      icon: Wrench,
      count: "9,876",
      color: "from-yellow-500 to-orange-500",
      description: "Professional services"
    },
    {
      id: "photography",
      name: "Photography",
      icon: Camera,
      count: "3,421",
      color: "from-teal-500 to-cyan-500",
      description: "Equipment, services, art"
    },
    {
      id: "gaming",
      name: "Gaming",
      icon: Gamepad2,
      count: "11,567",
      color: "from-violet-500 to-purple-500",
      description: "Games, consoles, accessories"
    },
    {
      id: "baby-kids",
      name: "Baby & Kids",
      icon: Baby,
      count: "6,789",
      color: "from-emerald-500 to-teal-500",
      description: "Toys, clothing, equipment"
    },
    {
      id: "music",
      name: "Music",
      icon: Music,
      count: "4,123",
      color: "from-cyan-500 to-blue-500",
      description: "Instruments, equipment, lessons"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Explore Categories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover thousands of listings across all categories. From everyday essentials
            to unique finds, everything you need is just a click away.
          </p>
        </motion.div>

        {/* Categories grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/categories/${category.id}`}>
                <div className="listing-card group cursor-pointer h-full">
                  {/* Icon and gradient background */}
                  <div className="relative mb-4">
                    <motion.div
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} p-4 mx-auto shadow-glow-sm group-hover:shadow-glow transition-all duration-300`}
                    >
                      <category.icon className="w-full h-full text-white" />
                    </motion.div>

                    {/* Hover glow effect */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} blur-xl opacity-0 mx-auto`}
                    />
                  </div>

                  {/* Category info */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-electric transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-neon-electric/10 border border-neon-electric/30">
                      <span className="text-neon-electric font-medium text-sm">
                        {category.count} listings
                      </span>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-electric/5 to-neon-purple/5 border border-neon-electric/20"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/categories">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <div className="btn-ghost-neon px-8 py-4 text-lg font-semibold rounded-xl">
                View All Categories
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
