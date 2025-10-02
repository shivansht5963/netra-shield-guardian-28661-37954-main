import { useState } from "react";
import { AlertCircle, CheckCircle, Shield, ShieldAlert, Link2, Lock, Globe, Award, Database } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import sihLogo from "@/assets/sih_logo.png";

interface DetectionResult {
  SCORE: number;
  InTop1Million: boolean;
  InURLVoidBlackList: boolean;
  isHTTPS: boolean;
  hasSSLCertificate: boolean;
  GoogleSafePassed: boolean;
  NortanWebSafePassed: boolean;
  InMcaffeBlackList: boolean;
  InSucuriBlacklist: boolean;
  isTemporaryDomain: boolean;
  isOlderThan3Months: boolean;
  isBlackListedinIpSets: boolean;
  result: boolean;
}

const Checker = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const normalizeUrl = (inputUrl: string): string => {
    let normalized = inputUrl.trim();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }
    return normalized;
  };

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleCheck = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL to check",
        variant: "destructive",
      });
      return;
    }

    const normalizedUrl = normalizeUrl(url);
    if (!isValidUrl(normalizedUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://netra-lmrc.onrender.com/api/detect/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to check URL");
      }

      const data = await response.json();
      setResult(data);
      
      toast({
        title: "Analysis Complete",
        description: `URL has been analyzed successfully`,
      });
    } catch (error) {
      console.error("Error checking URL:", error);
      toast({
        title: "Error",
        description: "Failed to analyze URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (result: DetectionResult): { level: string; label: string } => {
    console.log('Score evaluation:', result.SCORE, 'Type:', typeof result.SCORE);
    
    if (result.SCORE >= 160 && result.SCORE <= 180) {
      console.log('Matched: VERY SAFE');
      return { level: 'very-safe', label: 'VERY SAFE' };
    } else if (result.SCORE >= 140 && result.SCORE < 160) {
      console.log('Matched: GENERALLY SAFE');
      return { level: 'safe', label: 'GENERALLY SAFE' };
    } else if (result.SCORE >= 100 && result.SCORE < 140) {
      console.log('Matched: SUSPICIOUS');
      return { level: 'suspicious', label: 'SUSPICIOUS' };
    } else {
      console.log('Matched: HIGH RISK');
      return { level: 'dangerous', label: 'HIGH RISK' };
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'very-safe':
        return 'text-success';
      case 'safe':
        return 'text-success';
      case 'suspicious':
        return 'text-warning';
      case 'dangerous':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'very-safe':
        return <CheckCircle className="h-16 w-16 text-success" />;
      case 'safe':
        return <CheckCircle className="h-16 w-16 text-success" />;
      case 'suspicious':
        return <AlertCircle className="h-16 w-16 text-warning" />;
      case 'dangerous':
        return <ShieldAlert className="h-16 w-16 text-destructive" />;
      default:
        return <Shield className="h-16 w-16 text-muted-foreground" />;
    }
  };

  const riskInfo = result ? getRiskLevel(result) : null;

  return (
    <div className="min-h-screen relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-blue-50/20 to-white pointer-events-none"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <Navbar />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-8 space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={sihLogo} alt="Smart India Hackathon" className="h-16 w-16 object-contain" />
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Developed for</p>
              <p className="text-lg font-semibold text-primary">Smart India Hackathon 2025</p>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            URL Phishing Detector
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter any URL to check if it's a phishing attempt using our advanced AI models
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-8 mb-8 shadow-glass animate-scale-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter URL (e.g., example.com or https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                className="h-14 rounded-2xl text-lg border-2 focus:border-primary"
              />
            </div>
            <Button
              onClick={handleCheck}
              disabled={loading}
              className="bg-gradient-button text-primary-foreground hover:bg-gradient-button-hover rounded-2xl px-8 h-14 text-lg font-semibold transition-smooth hover:scale-105 shadow-glass"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-5 w-5" />
                  Check URL
                </>
              )}
            </Button>
          </div>
        </div>

        {result && riskInfo && (
          <div className="space-y-6">
            {/* Risk Level Card */}
            <div className="glass-strong rounded-3xl p-8 shadow-hover text-center animate-scale-in">
              <div className="flex flex-col items-center space-y-4">
                {getRiskIcon(riskInfo.level)}
                <h2 className={`text-3xl font-bold ${getRiskColor(riskInfo.level)}`}>
                  {riskInfo.label}
                </h2>
                <div className="text-muted-foreground">
                  Threat Score: <span className="font-bold text-2xl text-foreground">{result.SCORE}</span> / 180
                </div>
              </div>
            </div>

            {/* Primary Security Checks */}
            <div className="glass-strong rounded-3xl p-8 shadow-glass animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Primary Security Checks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SecurityItem
                  label="HTTPS Protocol"
                  value={result.isHTTPS}
                  description="Encrypted connection"
                />
                <SecurityItem
                  label="SSL Certificate"
                  value={result.hasSSLCertificate}
                  description="Valid security certificate"
                />
                <SecurityItem
                  label="Google Safe Browsing"
                  value={result.GoogleSafePassed}
                  description="Google's threat database"
                />
                <SecurityItem
                  label="Norton Web Safe"
                  value={result.NortanWebSafePassed}
                  description="Norton security check"
                />
              </div>
            </div>

            {/* Blacklist Analysis */}
            <div className="glass-strong rounded-3xl p-8 shadow-glass animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <Database className="mr-2 h-5 w-5 text-primary" />
                Blacklist Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SecurityItem
                  label="McAfee Blacklist"
                  value={!result.InMcaffeBlackList}
                  description="McAfee threat database"
                  invertValue
                />
                <SecurityItem
                  label="Sucuri Blacklist"
                  value={!result.InSucuriBlacklist}
                  description="Sucuri security scanner"
                  invertValue
                />
                <SecurityItem
                  label="URLVoid Blacklist"
                  value={!result.InURLVoidBlackList}
                  description="URLVoid reputation check"
                  invertValue
                />
                <SecurityItem
                  label="IP Blacklist"
                  value={!result.isBlackListedinIpSets}
                  description="IP reputation database"
                  invertValue
                />
              </div>
            </div>

            {/* Domain Information */}
            <div className="glass-strong rounded-3xl p-8 shadow-glass animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <Globe className="mr-2 h-5 w-5 text-primary" />
                Domain Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SecurityItem
                  label="Top 1 Million Sites"
                  value={result.InTop1Million}
                  description="Alexa ranking status"
                />
                <SecurityItem
                  label="Domain Age"
                  value={result.isOlderThan3Months}
                  description="Older than 3 months"
                />
                <SecurityItem
                  label="Domain Type"
                  value={!result.isTemporaryDomain}
                  description="Permanent domain check"
                  invertValue
                />
                <SecurityItem
                  label="Overall Result"
                  value={!result.result}
                  description="Final AI classification"
                  invertValue
                />
              </div>
            </div>

            {/* Recommendation */}
            <div className={`glass-strong rounded-3xl p-6 border-2 animate-fade-in-up ${
              riskInfo.level === 'very-safe' || riskInfo.level === 'safe'
                ? 'border-success/30' 
                : riskInfo.level === 'suspicious'
                ? 'border-warning/30'
                : 'border-destructive/30'
            }`} style={{ animationDelay: '0.4s' }}>
              <p className="text-center text-foreground font-medium">
                {riskInfo.level === 'very-safe'
                  ? '✓ This URL is very safe. Top-tier security with SSL/HTTPS and excellent reputation.'
                  : riskInfo.level === 'safe' 
                  ? '✓ This URL appears to be generally safe. However, always exercise caution when sharing personal information.'
                  : riskInfo.level === 'suspicious'
                  ? '⚠ This URL shows suspicious characteristics. Proceed with extreme caution and verify the source.'
                  : '⚠ This URL is high risk and likely a phishing attempt. Do NOT enter any personal information or credentials.'}
              </p>
            </div>
          </div>
        )}

        {!result && !loading && (
          <div className="glass rounded-3xl p-12 text-center">
            <Shield className="h-24 w-24 text-primary mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Ready to Analyze
            </h3>
            <p className="text-muted-foreground">
              Enter a URL above to begin real-time phishing detection
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface SecurityItemProps {
  label: string;
  value: boolean;
  description: string;
  invertValue?: boolean;
}

const SecurityItem = ({ label, value, description, invertValue = false }: SecurityItemProps) => {
  const displayValue = invertValue ? value : value;
  
  return (
    <div className="flex items-start space-x-3">
      <div className={`rounded-full p-2 ${displayValue ? 'bg-success/10' : 'bg-destructive/10'}`}>
        {displayValue ? (
          <CheckCircle className="h-5 w-5 text-success" />
        ) : (
          <AlertCircle className="h-5 w-5 text-destructive" />
        )}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-foreground">{label}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
        <div className={`text-sm font-medium ${displayValue ? 'text-success' : 'text-destructive'}`}>
          {displayValue ? 'Passed' : 'Failed'}
        </div>
      </div>
    </div>
  );
};

export default Checker;
