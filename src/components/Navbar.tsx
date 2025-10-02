import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="relative bg-white/5 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 rounded-3xl px-6 py-4 shadow-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] group">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="flex items-center justify-between">
          <Link to="/" className="transition-smooth hover:scale-105">
            <img src="/favicon.ico" alt="Netra" className="h-10 w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className={
                  isActive("/")
                    ? "bg-gradient-button text-primary-foreground hover:bg-gradient-button-hover rounded-2xl shadow-md backdrop-blur-xl"
                    : "rounded-2xl hover:bg-white/20 backdrop-blur-md transition-all duration-300"
                }
              >
                Home
              </Button>
            </Link>
            <Link to="/checker">
              <Button
                variant={isActive("/checker") ? "default" : "ghost"}
                className={
                  isActive("/checker")
                    ? "bg-gradient-button text-primary-foreground hover:bg-gradient-button-hover rounded-2xl shadow-md backdrop-blur-xl"
                    : "rounded-2xl hover:bg-white/20 backdrop-blur-md transition-all duration-300"
                }
              >
                URL Checker
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/checker">
              <Button className="bg-gradient-button text-primary-foreground hover:bg-gradient-button-hover rounded-2xl px-6 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-2xl border border-white/10">
                Try Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
