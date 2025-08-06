import { ThemeSelector } from "@/components/ThemeSelector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight, Clock, Phone, Search, Shield, Star, Upload, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    // Redirect to search page with query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Advanced Search",
      description: "Search by name, phone, photo, or Aadhaar with powerful filters"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Ethical & Secure",
      description: "All data is ethically sourced and complies with privacy regulations"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Verified Profiles",
      description: "Verified information with confidence ratings for accuracy"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time Results",
      description: "Get instant search results with up-to-date information"
    }
  ];

  const searchTypes = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Name Search",
      description: "Find people by their full name or partial matches",
      link: "/search"
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Phone Lookup",
      description: "Reverse phone number search and verification",
      link: "/search"
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Photo Search",
      description: "Upload a photo to find matching profiles",
      link: "/search"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Aadhaar Search",
      description: "Verify identity with Aadhaar card (OCR)",
      link: "/aadhaar-search"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-4 py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 gradient-primary text-white border-0">
              <Star className="h-3 w-3 mr-1" />
              Trusted by 10,000+ users
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find People 
              <span className="text-gradient block">Ethically & Legally</span>
            </h1>
            
            <p className="text-xl text-foreground-muted mb-10 max-w-2xl mx-auto">
              The most trusted people lookup platform. Search by name, phone, photo, or Aadhaar 
              with complete transparency and ethical data practices.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Enter name, phone number, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 pl-12 text-lg bg-surface border-2 border-border focus:border-primary"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground-muted" />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 px-8 gradient-primary text-white border-0 hover:shadow-glow transition-all duration-300"
                >
                  Search Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground-muted">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-success" />
                Ethical Data Only
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-primary" />
                10M+ Verified Profiles
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-secondary" />
                Instant Results
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Types */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Multiple Search Options
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Choose the search method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchTypes.map((type, index) => (
              <Link key={index} to={type.link}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 gradient-card border-card-border">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-lg gradient-primary text-white">
                        {type.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                    <p className="text-foreground-muted text-sm">{type.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-surface/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose CyberDetect?
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Built with ethics, transparency, and user privacy at the core
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full gradient-secondary text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          {/* Theme Selector */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Personalize Your Experience
              </h2>
              <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                Choose a theme that matches your style and preference
              </p>
            </div>
            <ThemeSelector />
          </div>

          <Card className="gradient-hero border-0 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Someone?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of users who trust CyberDetect for ethical and legal people verification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/search">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    <Search className="mr-2 h-5 w-5" />
                    Start Searching
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;