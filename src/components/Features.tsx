import { Shield, Zap, Brain, Lock, CheckCircle, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Real-Time Protection",
    description: "Instant phishing detection with <1 second response time using our advanced AI pipeline.",
  },
  {
    icon: Brain,
    title: "6 AI Models Ensemble",
    description: "Combining URL analysis, email inspection, DOM scanning, and visual recognition for maximum accuracy.",
  },
  {
    icon: Zap,
    title: "85.7% Accuracy",
    description: "Industry-leading precision powered by transformer models and gradient boosting algorithms.",
  },
  {
    icon: Lock,
    title: "Security Analysis",
    description: "Comprehensive checks including HTTPS, SSL certificates, domain age, and blacklist verification.",
  },
  {
    icon: CheckCircle,
    title: "Easy Integration",
    description: "Simple REST API integration with detailed documentation and SDKs for popular languages.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Learning",
    description: "Our models improve daily by learning from reported phishing attempts and new threat patterns.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="relative">
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-transparent pointer-events-none"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Advanced AI Protection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leveraging cutting-edge machine learning to keep you safe from phishing attacks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass rounded-3xl p-8 transition-smooth hover:scale-105 hover:shadow-hover group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-button rounded-2xl w-14 h-14 flex items-center justify-center mb-6 transition-smooth group-hover:scale-110">
                  <Icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
