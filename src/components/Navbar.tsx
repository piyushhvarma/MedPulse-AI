import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Simplified navigation labels for patients
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/check-in", label: "Check In" },
    { path: "/queue", label: "Live Wait List" },
    { path: "/doctor", label: "Staff Access" }, // Renamed from "Doctor Dashboard"
    { path: "/about", label: "About Us" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl transition-all duration-300 ease-in-out px-4",
        scrolled ? "glass-nav py-2" : "bg-transparent py-4"
      )}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 group"
        >
          <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
            <Activity className="h-6 w-6 text-white animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
            MedPulse
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-full px-2 py-1 border border-white/20 dark:border-white/10">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full px-4 font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary",
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
            Sign In
          </Button>
          <Button className="rounded-full bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 mx-4 rounded-2xl glass-panel md:hidden animate-in slide-in-from-top-5 fade-in duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant={isActive(link.path) ? "default" : "ghost"}
                  className="w-full justify-start font-medium rounded-xl"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2 border-t border-border/50">
              <Button variant="outline" className="w-full rounded-xl">Sign In</Button>
              <Button className="w-full rounded-xl">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
