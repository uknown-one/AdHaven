"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ExternalLink,
  Crown,
  TrendingUp,
  Eye,
  Clock,
  MapPin,
  ArrowRight,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PremiumListings() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample premium listings data
  const premiumListings = [
    {
      id: 1,
      title: "Luxury Tesla Model S - Nearly New Condition",
      price: "$89,900",
      location: "San Francisco, CA",
      category: "Vehicles",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=400&fit=crop",
      isExternal: true,
      externalUrl: "https://example.com/tesla",
      views: "2,345",
      timeLeft: "5 days",
      isPremium: true,
      isSponsored: true,
      rating: 4.9,
      sellerName: "EliteAutos",
      description: "Pristine condition Tesla Model S with advanced autopilot features and premium interior.",
    },
    {
      id: 2,
      title: "Modern Downtown Apartment - Prime Location",
      price: "$3,200/mo",
      location: "New York, NY",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop",
      isExternal: false,
      views: "1,876",
      timeLeft: "3 days",
      isPremium: true,
      isSponsored: true,
      rating: 4.8,
      sellerName: "UrbanLiving",
      description: "Stunning 2BR apartment with city views, modern amenities, and luxury finishes.",
    },
    {
      id: 3,
      title: "MacBook Pro M3 Max - Professional Setup",
      price: "$3,499",
      location: "Austin, TX",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=400&fit=crop",
      isExternal: true,
      externalUrl: "https://example.com/macbook",
      views: "3,421",
      timeLeft: "2 days",
      isPremium: true,
      isSponsored: false,
      rating: 5.0,
      sellerName: "TechPro",
      description: "Latest MacBook Pro with maximum specs, perfect for professional creative work.",
    },
    {
      id: 4,
      title: "Vintage Rolex Submariner - Collector's Edition",
      price: "$12,500",
      location: "Miami, FL",
      category: "Luxury",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop",
      isExternal: false,
      views: "987",
      timeLeft: "7 days",
      isPremium: true,
      isSponsored: true,
      rating: 4.9,
      sellerName: "LuxuryTimepieces",
      description: "Authentic vintage Rolex Submariner in excellent condition with original papers.",
    },
  ];

  // Auto-rotate premium listings
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % premiumListings.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [premiumListings.length]);

  const currentListing = premiumListings[currentIndex];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-electric/5 via-transparent to-neon-purple/5" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center glass-card bg-yellow-500/10 border-yellow-500/30 px-4 py-2 rounded-full mb-6">
            <Crown className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-yellow-500 font-medium">Premium Listings</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Featured Marketplace</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover premium listings from verified sellers. These featured ads get maximum
            visibility and priority placement across our platform.
          </p>
        </motion.div>

        {/* Featured listing carousel */}
        <div className="relative max-w-6xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="listing-card p-0 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image section */}
                <div className="relative h-80 md:h-96">
                  <Image
                    src={currentListing.image}
                    alt={currentListing.title}
                    fill
                    className="object-cover"
                  />

                  {/* Premium badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {currentListing.isPremium && (
                      <Badge className="premium-badge">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    {currentListing.isSponsored && (
                      <Badge className="bg-gradient-to-r from-neon-electric to-neon-purple text-white">
                        <Zap className="w-3 h-3 mr-1" />
                        Sponsored
                      </Badge>
                    )}
                  </div>

                  {/* External link indicator */}
                  {currentListing.isExternal && (
                    <div className="absolute top-4 right-4">
                      <div className="glass-card bg-white/10 p-2 rounded-full">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Stats overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass-card bg-black/50 p-3 rounded-lg">
                      <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {currentListing.views}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {currentListing.timeLeft}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {currentListing.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="border-neon-electric/50 text-neon-electric">
                        {currentListing.category}
                      </Badge>
                      <div className="text-2xl font-bold text-neon-electric">
                        {currentListing.price}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                      {currentListing.title}
                    </h3>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {currentListing.description}
                    </p>

                    <div className="flex items-center text-gray-400 mb-6">
                      <MapPin className="w-4 h-4 mr-2" />
                      {currentListing.location}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="text-sm text-gray-400">
                        Listed by <span className="text-white font-medium">{currentListing.sellerName}</span>
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span className="font-medium">{currentListing.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="btn-neon flex-1">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    {currentListing.isExternal && (
                      <Button variant="outline" className="btn-ghost-neon">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Site
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {premiumListings.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-neon-electric shadow-glow-sm'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Premium grid preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {premiumListings.slice(0, 4).map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="listing-card p-4 cursor-pointer"
            >
              <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
                {listing.isPremium && (
                  <div className="absolute top-2 left-2">
                    <Badge className="premium-badge text-xs">
                      <Crown className="w-2 h-2 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
              </div>

              <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2">
                {listing.title}
              </h4>

              <div className="flex items-center justify-between">
                <span className="text-neon-electric font-bold">
                  {listing.price}
                </span>
                <div className="flex items-center text-xs text-gray-400">
                  <Eye className="w-3 h-3 mr-1" />
                  {listing.views}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card max-w-2xl mx-auto p-8 border-yellow-500/30">
            <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Upgrade to Premium
            </h3>
            <p className="text-gray-300 mb-6">
              Get maximum visibility for your listings with premium placement,
              featured rotation, and priority search results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-neon">
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
              <Button variant="outline" className="btn-ghost-neon">
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
