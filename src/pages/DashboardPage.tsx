import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import DashboardPreview from "@/components/DashboardPreview";
import AIPredictor from "@/components/AIPredictor";
import PublicHealth from "@/components/PublicHealth";
import Footer from "@/components/Footer";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar for DashboardPage */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-4 bg-background/80 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">PathoScope AI</div>
          <div className="flex gap-4">
            <Link to="/" className="text-primary hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">Search NCBI</Link>
            <Link to="/public-health" className="text-muted-foreground hover:text-primary transition-colors">Public Health</Link>
            <Link to="/virus-bacteria-search" className="text-muted-foreground hover:text-primary transition-colors">Virus/Bacteria</Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
          </div>
        </div>
      </nav>
      <Hero />
      <HowItWorks />
      <DashboardPreview />
      <AIPredictor />
      <PublicHealth />
      <Footer />
    </div>
  );
};

export default DashboardPage;
