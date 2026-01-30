import { Heart, Mail, Phone, MapPin, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-background border-t border-border/40 pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl shadow-lg shadow-primary/20">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
                MedPulse
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              AI-driven patient prioritization for faster, fairer, and smarter healthcare delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Platform</h3>
            <div className="space-y-3">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/check-in" className="block text-muted-foreground hover:text-primary transition-colors">
                Patient Check-In
              </Link>
              <Link to="/queue" className="block text-muted-foreground hover:text-primary transition-colors">
                Queue Status
              </Link>
              <Link to="/doctor" className="block text-muted-foreground hover:text-primary transition-colors">
                For Doctors
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Company</h3>
            <div className="space-y-3">
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/careers" className="block text-muted-foreground hover:text-primary transition-colors">
                Careers
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-muted-foreground hover:text-foreground transition-colors group">
                <Phone className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground hover:text-foreground transition-colors group">
                <Mail className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                <span>support@medpulse.com</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground hover:text-foreground transition-colors group">
                <MapPin className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                <span>123 Healthcare Ave,<br />Medical City, NY 10010</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 MedPulse AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;