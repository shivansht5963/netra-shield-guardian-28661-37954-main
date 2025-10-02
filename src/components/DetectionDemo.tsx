import { useEffect, useState } from "react";
import { Shield, CheckCircle, AlertTriangle } from "lucide-react";

const DetectionDemo = () => {
  const [step, setStep] = useState(0);
  const [typedUrl, setTypedUrl] = useState("");
  
  const demos = [
    {
      url: "http://paypa1-secure-login.tk/verify",
      result: "phishing",
      message: "PHISHING DETECTED",
      color: "text-destructive"
    },
    {
      url: "https://github.com/login",
      result: "safe",
      message: "SAFE URL",
      color: "text-success"
    }
  ];

  const currentDemo = demos[step % 2];

  useEffect(() => {
    // Reset typed URL when demo changes
    setTypedUrl("");
    
    // Typing animation
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= currentDemo.url.length) {
        setTypedUrl(currentDemo.url.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Wait 2 seconds then move to next demo
        setTimeout(() => {
          setStep(s => s + 1);
        }, 3000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [step]);

  const isComplete = typedUrl === currentDemo.url;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Mock Browser Window */}
      <div className="glass-strong rounded-3xl overflow-hidden shadow-lg-custom border-2 border-white/40">
        {/* Browser Header */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4 border-b border-white/30">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
            <div className="w-3 h-3 rounded-full bg-warning/60"></div>
            <div className="w-3 h-3 rounded-full bg-success/60"></div>
          </div>
          <div className="flex items-center gap-3 glass rounded-xl px-4 py-3">
            <Shield className="h-5 w-5 text-primary" />
            <input
              type="text"
              value={typedUrl}
              readOnly
              className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm"
              placeholder="Type URL here..."
            />
          </div>
        </div>

        {/* Browser Content */}
        <div className="p-8 min-h-[300px] flex items-center justify-center bg-gradient-to-br from-white/50 to-white/30">
          {isComplete ? (
            <div className="text-center space-y-6 animate-scale-in">
              {currentDemo.result === "safe" ? (
                <CheckCircle className="h-24 w-24 text-success mx-auto animate-pulse" />
              ) : (
                <AlertTriangle className="h-24 w-24 text-destructive mx-auto animate-pulse" />
              )}
              <div>
                <h3 className={`text-3xl font-bold ${currentDemo.color} mb-2`}>
                  {currentDemo.message}
                </h3>
                <p className="text-muted-foreground">
                  {currentDemo.result === "safe" 
                    ? "This URL passed all security checks"
                    : "Phishing attempt blocked by AI"}
                </p>
              </div>
              {currentDemo.result === "phishing" && (
                <div className="glass rounded-2xl px-6 py-4 border border-destructive/30">
                  <p className="text-sm font-semibold text-destructive">
                    ⚠ Threat Score: 145/180
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Multiple blacklist matches detected
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="animate-pulse">
                <Shield className="h-16 w-16 text-primary/40 mx-auto mb-4" />
                <p className="text-muted-foreground">Analyzing URL...</p>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demo Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              (step % 2) === i ? 'w-8 bg-primary' : 'w-2 bg-primary/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DetectionDemo;
