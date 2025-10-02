import { useState, useEffect } from "react";
import { Shield, AlertCircle, CheckCircle, X } from "lucide-react";

const ScoringAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(180);

  const checks = [
    { label: "Starting Score", points: 0, type: "start", icon: Shield },
    { label: "SSL Certificate", points: -15, type: "fail", icon: X },
    { label: "HTTPS Protocol", points: -15, type: "fail", icon: X },
    { label: "Google Safe Browsing", points: 0, type: "pass", icon: CheckCircle },
    { label: "Norton Web Safe", points: 0, type: "pass", icon: CheckCircle },
    { label: "McAfee Blacklist", points: -25, type: "fail", icon: AlertCircle },
    { label: "Domain Age Check", points: 0, type: "pass", icon: CheckCircle },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= checks.length - 1) {
          setTimeout(() => {
            setCurrentStep(0);
            setScore(180);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [checks.length]);

  useEffect(() => {
    if (currentStep > 0) {
      const newScore = 180 - checks.slice(1, currentStep + 1).reduce((sum, check) => sum + Math.abs(check.points), 0);
      setScore(newScore);
    } else {
      setScore(180);
    }
  }, [currentStep, checks]);

  const getFinalRisk = () => {
    if (score >= 160) return { label: "VERY SAFE", color: "text-success" };
    if (score >= 140) return { label: "GENERALLY SAFE", color: "text-success" };
    if (score >= 100) return { label: "SUSPICIOUS", color: "text-warning" };
    return { label: "HIGH RISK", color: "text-destructive" };
  };

  const riskLevel = getFinalRisk();

  return (
    <div className="glass-strong rounded-3xl p-8 space-y-6">
      {/* Score Display */}
      <div className="text-center space-y-2">
        <div className="text-6xl font-bold text-primary animate-scale-in">
          {score}
        </div>
        <div className="text-sm text-muted-foreground">out of 180</div>
        <div className={`text-xl font-bold ${riskLevel.color} animate-fade-in`}>
          {riskLevel.label}
        </div>
      </div>

      {/* Checks Progress */}
      <div className="space-y-3">
        {checks.map((check, index) => {
          const Icon = check.icon;
          const isActive = index <= currentStep;
          const isStart = check.type === "start";

          return (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-500 ${
                isActive
                  ? isStart
                    ? "glass border border-primary/30"
                    : check.type === "pass"
                    ? "glass border border-success/30"
                    : "glass border border-destructive/30"
                  : "glass opacity-30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    !isActive
                      ? "bg-muted/50"
                      : isStart
                      ? "bg-primary/10"
                      : check.type === "pass"
                      ? "bg-success/10"
                      : "bg-destructive/10"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      !isActive
                        ? "text-muted-foreground"
                        : isStart
                        ? "text-primary"
                        : check.type === "pass"
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  />
                </div>
                <span className={`font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {check.label}
                </span>
              </div>
              {check.points !== 0 && (
                <span
                  className={`font-bold text-lg ${
                    isActive ? (check.type === "pass" ? "text-success" : "text-destructive") : "text-muted-foreground"
                  }`}
                >
                  {check.points}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Deduction Rules */}
      <div className="glass rounded-2xl p-4 space-y-2 text-sm">
        <div className="font-bold text-foreground mb-2">Deduction Rules:</div>
        <div className="text-muted-foreground space-y-1">
          <div>• Security Checks: -25 points (Blacklist/Failed checks)</div>
          <div>• Basic Issues: -15 points (No SSL/HTTPS, New domain)</div>
          <div>• Auto High Risk: 3+ flags OR score &lt; 100</div>
        </div>
      </div>
    </div>
  );
};

export default ScoringAnimation;
