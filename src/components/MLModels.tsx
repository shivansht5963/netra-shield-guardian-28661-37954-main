import { Bot, Mail, Code, Eye, GitBranch, Sparkles } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const models = [
  {
    icon: Bot,
    name: "URL Transformer + LightGBM",
    subtitle: "Advanced URL Pattern Analysis",
    description: "Analyzes URL structure, domain patterns, and suspicious elements using transformer architecture combined with gradient boosting for high-speed classification.",
    color: "text-purple-400"
  },
  {
    icon: Mail,
    name: "Email DeBERTa",
    subtitle: "Email Content Intelligence",
    description: "Deep learning model that understands email context, sender authenticity, and linguistic patterns to detect phishing attempts in email communications.",
    color: "text-purple-400"
  },
  {
    icon: Code,
    name: "HTML DOM GNN",
    subtitle: "Website Structure Analysis",
    description: "Graph Neural Network that examines HTML structure, JavaScript behaviors, and DOM manipulation to identify malicious webpage patterns.",
    color: "text-purple-400"
  },
  {
    icon: Eye,
    name: "Screenshot CNN + OCR",
    subtitle: "Visual Phishing Detection",
    description: "Computer vision model that captures and analyzes website screenshots, detecting visual spoofing, fake login forms, and brand impersonation.",
    color: "text-purple-400"
  },
  {
    icon: GitBranch,
    name: "Temporal Graph Transformer",
    subtitle: "Behavioral Pattern Recognition",
    description: "Tracks temporal patterns and user behavior flows to identify phishing campaigns and coordinated attack strategies across time.",
    color: "text-purple-400"
  },
  {
    icon: Sparkles,
    name: "LLM Assist",
    subtitle: "Context-Aware Intelligence",
    description: "Large Language Model providing contextual understanding, threat intelligence, and natural language analysis for comprehensive protection.",
    color: "text-purple-400"
  }
];

const MLModels = () => {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % models.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-checker">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 mb-4">
            <Bot className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Powered by AI
            </span>
          </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Our ML Model Arsenal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Six specialized AI models working together to provide unmatched phishing detection
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-12 transition-smooth relative">
            <div className="flex flex-col items-center text-center">
              <div className="absolute top-6 right-6">
                <div className="relative">
                  <div className={`absolute inset-0 ${models[current].color} opacity-20 blur-xl rounded-full`}></div>
                  {React.createElement(models[current].icon, {
                    className: `h-12 w-12 ${models[current].color} relative`
                  })}
                </div>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                {models[current].name}
              </h2>
              <p className="text-lg font-medium text-primary mb-6">
                {models[current].subtitle}
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                {models[current].description}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 mt-8">
            {models.map((model, index) => {
              const Icon = model.icon;
              return (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`flex items-center justify-center p-3 rounded-xl transition-all ${
                    current === index 
                      ? "bg-primary/10 scale-110" 
                      : "hover:bg-muted/60"
                  }`}
                >
                  {React.createElement(Icon, {
                    className: `h-5 w-5 ${
                      current === index 
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`
                  })}
                </button>
              );
            })}
          </div>

          {/* Model Status Indicator */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-3 glass rounded-full px-8 py-4">
              <div className="flex gap-2">
                {models.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      current === index 
                        ? "bg-primary scale-110" 
                        : "bg-primary/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                ML Models Active
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="glass-strong rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ensemble Intelligence
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our models don't work in isolation. They operate as an ensemble, cross-validating results 
              and combining their strengths to achieve industry-leading 85.7% accuracy. Each model 
              contributes unique insights, creating a comprehensive defense against evolving phishing threats.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MLModels;
