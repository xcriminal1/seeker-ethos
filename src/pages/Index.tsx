import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronDown, Clock, Search, Shield, Sparkles, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          {/* Original boxes */}
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary/60 rotate-45 animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-secondary/60 rotate-12 animate-bounce"></div>
          <div className="absolute bottom-32 left-40 w-40 h-40 border border-accent/60 -rotate-12 animate-spin"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 border border-primary/60 rotate-45 animate-pulse"></div>
          
          {/* Additional floating boxes */}
          <div className="absolute top-60 left-1/4 w-20 h-20 border border-secondary/70 rotate-30 animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-36 h-36 border border-accent/50 -rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-16 h-16 border border-primary/65 rotate-60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-3/4 left-16 w-28 h-28 border border-accent/60 -rotate-30 animate-spin" style={{ animationDuration: '12s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-22 h-22 border border-secondary/65 rotate-75 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-12 w-14 h-14 border border-primary/70 -rotate-60 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-16 left-1/3 w-32 h-32 border border-accent/55 rotate-15 animate-spin" style={{ animationDuration: '15s' }}></div>
          <div className="absolute top-16 right-16 w-18 h-18 border border-secondary/62 -rotate-45 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute top-2/3 right-1/2 w-26 h-26 border border-primary/50 rotate-90 animate-bounce" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute bottom-40 right-12 w-20 h-20 border border-accent/68 -rotate-75 animate-spin" style={{ animationDuration: '10s' }}></div>
          
          {/* Small floating squares */}
          <div className="absolute top-1/4 left-3/4 w-12 h-12 border border-primary/60 rotate-45 animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-3/4 left-2/3 w-10 h-10 border border-secondary/70 -rotate-30 animate-bounce" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute top-80 right-1/5 w-15 h-15 border border-accent/65 rotate-60 animate-spin" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-60 left-1/5 w-24 h-24 border border-primary/55 -rotate-15 animate-pulse" style={{ animationDelay: '2.8s' }}></div>
        </div>

        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 border border-primary/50 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="container mx-auto text-center">
          {/* Animated Badge */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge 
              variant="outline" 
              className="mb-8 px-4 py-2 text-sm bg-primary/10 border-primary/30 text-primary animate-pulse"
            >
              <Sparkles className="h-3 w-3 mr-2" />
              Best Services & IT Solutions
            </Badge>
          </div>

          {/* Main Heading */}
          <div className={`transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block">Providing The</span>
              <span className="block text-gradient">Best Services</span>
              <span className="block relative">
                & IT Solutions
                <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 animate-scale-x"></div>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className={`transition-all duration-1000 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl md:text-2xl text-foreground-muted mb-12 max-w-4xl mx-auto leading-relaxed">
              We believe in providing{" "}
              <span className="text-primary font-semibold">Best career opportunities! Excel your growth towards</span>{" "}
              future through our virtual internship program today.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`transition-all duration-1000 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/search">
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg gradient-primary text-white border-0 hover:scale-105 transition-transform duration-300 group"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                onClick={scrollToFeatures}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`transition-all duration-1000 delay-800 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button 
              onClick={scrollToFeatures}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary/10 transition-colors group"
            >
              <ChevronDown className="h-5 w-5 text-primary animate-bounce group-hover:animate-none" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient">CyberZer0</span>?
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Built with ethics, transparency, and user privacy at the core
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8" />,
                title: "Advanced Search",
                description: "Search by name, phone, photo, or Aadhaar with powerful filters"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Ethical & Secure",
                description: "All data is ethically sourced and complies with privacy regulations"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Verified Profiles",
                description: "Verified information with confidence ratings for accuracy"
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Real-time Results",
                description: "Get instant search results with up-to-date information"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="group h-full hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 border-card-border bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-2xl gradient-primary text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-foreground-muted text-sm flex-1">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <Card className="gradient-hero border-0 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Find Someone?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of users who trust CyberZer0 for ethical and legal people verification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/search">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300">
                    <Search className="mr-2 h-5 w-5" />
                    Start Searching
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300">
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
