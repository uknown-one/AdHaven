"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Menu,
  X,
  User,
  Bell,
  Plus,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/forums", label: "Forums" },
    { href: "/premium", label: "Premium" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav backdrop-blur-xl bg-void-950/90 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="w-8 h-8 text-neon-electric group-hover:text-neon-purple transition-colors duration-300" />
              <div className="absolute inset-0 w-8 h-8 bg-neon-electric/20 blur-sm group-hover:bg-neon-purple/20 transition-colors duration-300" />
            </div>
            <span className="text-xl font-bold gradient-text">
              FutureClassifieds
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center relative">
            <motion.div
              initial={false}
              animate={{ width: isSearchOpen ? 300 : 200 }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search listings, categories..."
                className="pl-10 pr-4 bg-void-900/50 border-white/20 focus:border-neon-electric text-white placeholder-gray-400"
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
              />
            </motion.div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-300 hover:text-neon-electric hover:bg-neon-electric/10"
            >
              <Bell className="w-5 h-5" />
              <div className="notification-dot absolute -top-1 -right-1" />
            </Button>

            {/* User Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-neon-electric hover:bg-neon-electric/10"
            >
              <User className="w-5 h-5" />
            </Button>

            {/* Post Ad Button */}
            <Button className="btn-neon">
              <Plus className="w-4 h-4 mr-2" />
              Post Free Ad
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:text-neon-electric"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-white/10">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-void-900/50 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-neon-electric py-2 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-neon-electric"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-neon-electric"
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              </div>
              <Button className="btn-neon text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Post Ad
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
