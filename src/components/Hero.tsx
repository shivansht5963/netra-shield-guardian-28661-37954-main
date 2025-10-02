import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import sihLogo from "@/assets/sih_logo.png";
import DetectionDemo from "./DetectionDemo";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-blue-50/20 to-white pointer-events-none"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Branding */}
          <div className="space-y-6 animate-fade-in-up">
            {/* SIH Branding */}
            <div className="flex items-center gap-3 animate-scale-in">
              <img src={sihLogo} alt="Smart India Hackathon" className="h-16 w-16 object-contain" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">Developed for</p>
                <p className="text-sm font-bold text-foreground">Smart India Hackathon 2025</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">by Team $upremes</p>
              </div>
            </div>

            {/* Main Branding */}
            <div>
              <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4">
                Netra
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                AI-powered phishing detection that secures your digital identity in real-time
              </p>
              <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2">
                <Shield className="h-4 w-4 text-primary animate-glow" />
                <span className="text-sm font-semibold text-foreground">
                  Powered by 6 AI Models
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Link to="/checker">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl px-8 py-6 text-lg font-semibold transition-smooth hover:scale-105 shadow-lg-custom">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10 rounded-2xl px-8 py-6 text-lg font-semibold transition-smooth hover:scale-105"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { value: "85.7%", label: "Accuracy" },
                { value: "6 AI", label: "Models" },
                { value: "<1s", label: "Detection" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-4 transition-smooth hover:scale-105"
                >
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Live Demo */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="mb-6 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-foreground mb-2">Live Detection Demo</h2>
              <p className="text-muted-foreground">Watch our AI detect threats in real-time</p>
            </div>
            <DetectionDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
