import { Link } from "react-router-dom";
import { Search, Shield, Users, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-card-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-primary">
                <Search className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">CyberZer0</span>
            </Link>
            <p className="text-foreground-muted text-sm leading-relaxed mb-4">
              Ethical people lookup platform for transparent and legal verification purposes only.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-foreground-muted">Verified & Secure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/search" className="text-foreground-muted hover:text-primary transition-colors">
                  Search People
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground-muted hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-foreground-muted hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/members" className="text-foreground-muted hover:text-primary transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-foreground-muted hover:text-primary transition-colors">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Ethics */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal & Ethics</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground-muted hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground-muted hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground-muted hover:text-primary transition-colors">
                  Data Ethics
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground-muted hover:text-primary transition-colors">
                  Report Information
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground-muted hover:text-primary transition-colors">
                  Remove My Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-foreground-muted">
                <Mail className="h-4 w-4" />
                <span>support@CyberZer0.com</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground-muted">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground-muted">
                <MapPin className="h-4 w-4" />
                <span>123 Ethics Street, Privacy City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-card-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-foreground-muted">
              © 2024 CyberZer0. All rights reserved.
            </div>
            
            {/* Ethics Notice */}
            <div className="flex items-center space-x-2 bg-warning-light text-warning px-3 py-2 rounded-md text-sm">
              <Shield className="h-4 w-4" />
              <span className="font-medium">For ethical and legal use only. No private data stored.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;