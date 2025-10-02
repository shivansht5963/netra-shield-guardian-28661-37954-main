import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/80 to-white/90">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-black">
          Start Protecting Yourself Today
        </h2>
        <p className="text-xl text-black/90 max-w-2xl mx-auto">
          An SIH 2025 prototype for next-gen phishing defense.
          Try our URL checker now and experience the power of AI-driven security.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/checker">
            <Button className="bg-white text-primary hover:bg-white/90 rounded-2xl px-8 py-6 text-lg font-semibold transition-smooth hover:scale-105 shadow-lg-custom">
              Check a URL Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
