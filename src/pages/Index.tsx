import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, BookOpen, ChevronDown, Code, Shield, Sparkles } from "lucide-react";
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
              <span className="block">Providing Trusted</span>
              <span className="block text-gradient">Cyber Identities</span>
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
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg gradient-primary text-white border-0 hover:scale-105 transition-transform duration-300 group"
                >
                  Join CyberDetect
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
          <div className={`transition-all duration-1000 delay-800 transform ${isVisible ? 'translate-y-10 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button 
              onClick={scrollToFeatures}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary/10 transition-colors group"
            >
              <ChevronDown className="h-5 w-5 text-primary animate-bounce group-hover:animate-none" />
            </button>
          </div>
        </div>
      </section>

      {/* Tech Tools Circular Section */}
      <section className="py-4 px-4 relative bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to <span className="text-gradient">CyberDetect</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-4xl mx-auto leading-relaxed">
              education center to develop skills from professional tech experts.
            </p>
            <p className="text-lg text-foreground-muted mt-4 max-w-2xl mx-auto">
              More efficient and more effective.
            </p>
          </div>

          {/* Circular Tech Tools Layout */}
          <div className="relative flex items-center justify-center min-h-[600px] mt-16">
            {/* Central Circle with Circuit Board Pattern */}
            <div className="absolute z-10 w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-400 via-cyan-300 to-purple-500 flex items-center justify-center shadow-2xl">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
                {/* Circuit board pattern */}
                <div className="absolute inset-0 opacity-60">
                  <img
                    src="/logo.webp"
                    alt="CyberDetect Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {/* Central Key Icon */}
                <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 text-cyan-300">
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Tech Tool Icons with Real App Styling */}
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Wireshark - Top */}
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-90 border border-white/20">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                    <img
                    src="/wire.jpeg"
                    alt="Wireshark"
                    className="w-10 h-10 object-contain"
                    />
                </div>
              </div>
              
              {/* CyberChef - Top Right */}
              {/* <div className="absolute -top-8 right-1/4 transform translate-x-6 w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-90 border border-white/20">
                <img
                    src="/CF.png"
                    alt="CyberChef"
                    className="w-10 h-10 object-contain"
                    />
              </div> */}
              
              {/* Maltego - Right */}
              <div className="absolute right-0 top-1/2 transform translate-x-12 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-90 border border-white/20">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                  <img
                    src="/Maltego-Logo.jpg"
                    alt="Maltego"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              
              {/* Suricata - Bottom Right */}
              <div className="absolute bottom-8 right-1/4 transform translate-x-6 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-90 border border-white/20">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                  <img
                    src="/Suricata.jpg"
                    alt="Suricata"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              
              {/* Maltego - Bottom */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-90 border border-white/20">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                  <img
                    src="/Maltego-Logo.jpg"
                    alt="Maltego"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              
              {/* Aircrack-ng - Bottom Left */}
              <div className="absolute bottom-8 left-1/4 transform -translate-x-6 w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-90 border border-white/20">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                  <img
                    src="/Burpsuite.png"
                    alt="Burpsuite"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              
              {/* Prompt - Left */}
              <div className="absolute left-0 top-1/2 transform -translate-x-12 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-90 border border-white/20">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                  <img
                    src="/git.png"
                    alt="Git"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              
              {/* Nmap - Top Left */}
              {/* <div className="absolute -top-8 left-1/4 transform -translate-x-6 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-90 border border-white/20">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <div className="text-indigo-600 text-lg font-bold">N</div>
                </div>
              </div> */}
            </div>

            {/* Curved Connecting Lines with Arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(59 130 246)" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="rgb(34 211 238)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="rgb(147 51 234)" stopOpacity="0.4" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="rgb(34 211 238)" opacity="0.6"/>
                </marker>
              </defs>
              
              {/* Curved paths from center to each tool */}
              <path d="M 300,300 Q 250,150 300,80" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#arrowhead)" className="animate-pulse"/>
              <path d="M 300,300 Q 450,150 400,100" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#arrowhead)" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
              <path d="M 300,300 Q 500,250 520,300" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#arrowhead)" className="animate-pulse" style={{animationDelay: '1s'}}/>
              <path d="M 300,300 Q 450,450 400,500" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#arrowhead)" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
              <path d="M 300,300 Q 250,450 300,520" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#arrowhead)" className="animate-pulse" style={{animationDelay: '2s'}}/>
              <path d="M 300,300 Q 150,450 200,500" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#arrowhead)" className="animate-pulse" style={{animationDelay: '2.5s'}}/>
              <path d="M 300,300 Q 100,250 80,300" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#arrowhead)" className="animate-pulse" style={{animationDelay: '3s'}}/>
              <path d="M 300,300 Q 150,150 200,100" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#arrowhead)" className="animate-pulse" style={{animationDelay: '3.5s'}}/>
              
              {/* Outer rotating circle */}
              <circle 
                cx="300" 
                cy="300" 
                r="220" 
                fill="none" 
                stroke="url(#lineGradient)" 
                strokeWidth="1" 
                strokeDasharray="15,10"
                className="animate-spin opacity-30"
                style={{ animationDuration: '30s' }}
              />
            </svg>

            {/* Floating text "More efficient and more effective" */}
            <div className="absolute -top-4 -left-8 text-white/80 text-lg font-medium transform -rotate-12">
              <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                More efficient and<br/>more effective.
              </div>
            </div>

            {/* Floating text on right side - Security themed */}
            <div className="absolute -top-4 -right-8 text-white/80 text-lg font-medium transform rotate-12">
              <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                More secure and<br/>more protective.
              </div>
            </div>
          </div>

          {/* Bottom Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-primary">Achievement</h3>
              <p className="text-foreground-muted text-sm">
                Successfully trained 500+ police officers in cyber law enforcement & digital forensics.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-primary">About our founder</h3>
              <p className="text-foreground-muted text-sm">
                Anmol Kumar is a certified cybersecurity expert, trainer, and law enforcement instructor with extensive hands-on experience in cybercrime investigations, network security, and digital forensics.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-primary">Expertise</h3>
              <p className="text-foreground-muted text-sm">
                Certified cybersecurity expert and law enforcement instructor specializing in cybercrime investigations, digital forensics, and threat intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient">CyberDetect</span>?
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Leading technology education center with professional tech experts and industry recognition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Cybersecurity Expert",
                description: "Certified cybersecurity expert training with 500+ police officers trained"
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Programming Skills",
                description: "Master programming languages and development frameworks from industry experts"
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Professional Training",
                description: "Hands-on courses with industry-recognized certifications and real-world applications"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Proven Results",
                description: "Successfully trained 2,500+ university students with specialized expertise"
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
                Ready to Start Learning?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join CyberDetect and develop skills in programming and cybersecurity from professional tech experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" variant="secondary" className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground hover:scale-105 transition-all duration-300">
                    <Shield className="mr-2 h-5 w-5" />
                    Join Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background hover:scale-105 transition-all duration-300">
                    Learn More
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
