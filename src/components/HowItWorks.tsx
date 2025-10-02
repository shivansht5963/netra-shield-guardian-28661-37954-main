import { Database, Shield, Zap, Network, CheckCircle, Calculator } from "lucide-react";
import ScoringAnimation from "./ScoringAnimation";
import DetectionDemo from "./DetectionDemo";

const HowItWorks = () => {
  const steps = [
    {
      icon: Database,
      title: "URL Submission",
      description: "User submits a URL through our secure frontend interface"
    },
    {
      icon: Network,
      title: "Feature Extraction",
      description: "Backend extracts security features including SSL status, domain age, HTTPS protocol, and blacklist checks"
    },
    {
      icon: Calculator,
      title: "Scoring System",
      description: "Starts at 180 points. Deducts 25 points for blacklists/failed checks, 15 points for SSL/HTTPS/domain issues"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Generates final threat score and classification based on security checks and deduction rules"
    },
    {
      icon: CheckCircle,
      title: "Real-time Results",
      description: "Instant classification with detailed security breakdown delivered to user in <1 second"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-transparent">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">MVP Architecture</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            How Our Scoring System Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A production-ready MVP with intelligent scoring and real-time security checks
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Process Steps */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Process Steps</h3>
              <p className="text-muted-foreground">How our system evaluates URLs</p>
            </div>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="glass rounded-3xl p-6 transition-smooth hover:shadow-hover hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="glass-strong rounded-2xl p-4 border border-primary/20">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-primary">{index + 1}</span>
                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Scoring System */}
          <div>
            <div className="glass rounded-3xl p-6">
              <ScoringAnimation />
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="glass-strong rounded-3xl p-8 mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Django", desc: "High-performance backend" },
              { name: "PostgreSQL", desc: "Scalable database" },
              { name: "Multiple", desc: "ML model serving" },
              { name: "React", desc: "Modern frontend" }
            ].map((tech, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="glass rounded-2xl px-4 py-6 transition-smooth hover:shadow-hover">
                  <p className="font-bold text-foreground text-lg">{tech.name}</p>
                  <p className="text-sm text-muted-foreground">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
