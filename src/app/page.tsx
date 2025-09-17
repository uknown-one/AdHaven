import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { PremiumListings } from "@/components/sections/PremiumListings";
import { FloatingCTA } from "@/components/ui/FloatingCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Header />

      {/* Main content */}
      <div className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Premium Listings */}
        <PremiumListings />

        {/* Categories */}
        <CategoriesSection />

        {/* Floating CTA */}
        <FloatingCTA />
      </div>
    </main>
  );
}
