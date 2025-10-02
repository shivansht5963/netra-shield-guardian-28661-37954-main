import { useEffect, useState } from "react";
import { Network, Mail, Code, Eye, GitBranch, Sparkles } from "lucide-react";

const AIModelsShowcase = () => {
  const [activeModel, setActiveModel] = useState(0);

  const models = [
    {
      name: "URL Transformer + LightGBM",
      icon: Network,
      color: "text-blue-500",
      subtitle: "Advanced URL Pattern Analysis",
      description: "Analyzes URL structure, domain patterns, and suspicious elements using transformer architecture combined with gradient boosting for high-speed classification."
    },
    {
      name: "Email DeBERTa",
      icon: Mail,
      color: "text-blue-500",
      subtitle: "Email Content Intelligence",
      description: "Deep learning model that understands email context, sender authenticity, and linguistic patterns to detect phishing attempts in email communications."
    },
    {
      name: "HTML DOM GNN",
      icon: Code,
      color: "text-blue-500",
      subtitle: "Website Structure Analysis",
      description: "Graph Neural Network that examines HTML structure, JavaScript behaviors, and DOM manipulation to identify malicious webpage patterns."
    },
    {
      name: "Screenshot CNN + OCR",
      icon: Eye,
      color: "text-blue-500",
      subtitle: "Visual Phishing Detection",
      description: "Computer vision model that captures and analyzes website screenshots, detecting visual spoofing, fake login forms, and brand impersonation."
    },
    {
      name: "Temporal Graph Transformer",
      icon: GitBranch,
      color: "text-blue-500",
      subtitle: "Behavioral Pattern Recognition",
      description: "Tracks temporal patterns and user behavior flows to identify phishing campaigns and coordinated attack strategies across time."
    },
    {
      name: "LLM Assist",
      icon: Sparkles,
      color: "text-blue-500",
      subtitle: "Context-Aware Intelligence",
      description: "Large Language Model providing contextual understanding, threat intelligence, and natural language analysis for comprehensive protection."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModel((prev) => (prev + 1) % models.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Our ML Model Arsenal
          </h2>
          <p className="text-xl text-black/70 max-w-3xl mx-auto">
            Six specialized AI models working together to provide unmatched phishing detection
          </p>
        </div>

        {/* Active Model Display */}
        <div className="glass-strong rounded-3xl p-8 md:p-12 mb-12 border-2 border-primary/40 max-w-4xl mx-auto shadow-lg backdrop-blur-lg">
          <div className="text-center space-y-6">
            {models.map((model, index) => {
              const Icon = model.icon;
              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    activeModel === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 absolute inset-0"
                  }`}
                >
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className={`absolute inset-0 ${model.color} opacity-20 blur-2xl rounded-full`}></div>
                      <Icon className={`h-24 w-24 ${model.color} relative animate-pulse`} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-3">
                    {model.name}
                  </h3>
                  <p className="text-lg font-medium text-black/90 mb-4">
                    {model.subtitle}
                  </p>
                  <p className="text-lg text-black/80">
                    {model.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Model Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {models.map((model, index) => {
            const Icon = model.icon;
            return (
              <div
                key={index}
                className={`glass rounded-2xl p-4 transition-all cursor-pointer backdrop-blur-sm ${
                  activeModel === index
                    ? "border-2 border-primary shadow-lg scale-105 bg-primary/10"
                    : "border border-white/20 hover:scale-105 hover:border-primary/40"
                }`}
                onClick={() => setActiveModel(index)}
              >
                <Icon className={`h-8 w-8 ${model.color} mx-auto`} />
              </div>
            );
          })}
        </div>

        {/* Processing Animation */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 glass rounded-full px-8 py-4">
            <div className="flex gap-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeModel === i ? "bg-primary scale-125" : "bg-primary/30"
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              AI Models Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIModelsShowcase;
