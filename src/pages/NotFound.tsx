import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, Search } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4">
      <Card className="w-full max-w-lg text-center gradient-card border-card-border shadow-xl">
        <CardContent className="p-12">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-gradient animate-pulse">404</h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              Oops! Page Not Found
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track!
            </p>
            {location.pathname && (
              <p className="text-sm text-foreground-subtle mt-2 font-mono bg-muted px-3 py-1 rounded-md inline-block">
                {location.pathname}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="gradient-primary text-white border-0 w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" className="w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Start Searching
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-foreground-muted mb-3">Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/about">
                <Button variant="ghost" size="sm" className="text-xs">
                  About Us
                </Button>
              </Link>
              <Link to="/our-team">
                <Button variant="ghost" size="sm" className="text-xs">
                  Our Team
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="ghost" size="sm" className="text-xs">
                  Pricing
                </Button>
              </Link>
              <Link to="/join">
                <Button variant="ghost" size="sm" className="text-xs">
                  Join Us
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
