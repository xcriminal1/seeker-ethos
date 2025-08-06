import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle, Eye, Globe, Heart, Shield, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "We prioritize user privacy and never store sensitive personal information"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Transparency",
      description: "Complete transparency in our data sources and verification processes"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Trust",
      description: "Building trust through ethical practices and community feedback"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Accuracy",
      description: "Ensuring the highest level of data accuracy and verification"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Enter Search Query",
      description: "Input name, phone number, or upload a photo/Aadhaar card"
    },
    {
      step: "2",
      title: "Ethical Data Search",
      description: "Our system searches only publicly available and ethically sourced data"
    },
    {
      step: "3",
      title: "Verification Process",
      description: "Results are verified using multiple sources and confidence algorithms"
    },
    {
      step: "4",
      title: "Secure Results",
      description: "View detailed results with confidence ratings and verification status"
    }
  ];

  const achievements = [
    { number: "10M+", label: "Verified Profiles" },
    { number: "50K+", label: "Daily Searches" },
    { number: "99.2%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-6 gradient-primary text-white border-0">
            <Award className="h-3 w-3 mr-1" />
            Trusted Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-gradient">CyberDetect</span>
          </h1>
          
          <p className="text-xl text-foreground-muted mb-8 max-w-3xl mx-auto">
            We're on a mission to make people verification ethical, transparent, and accessible while maintaining the highest standards of privacy and data protection.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-foreground-muted mb-6">
                To provide a safe, ethical, and transparent platform for people verification that respects privacy while serving legitimate needs for identity confirmation and background verification.
              </p>
              <p className="text-lg text-foreground-muted mb-8">
                We believe that access to public information should be balanced with privacy rights, and our technology ensures that sensitive data is never stored or misused.
              </p>
              <Link to="/join">
                <Button size="lg" className="gradient-primary text-white border-0">
                  <Heart className="mr-2 h-5 w-5" />
                  Join Our Mission
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Card className="gradient-card border-card-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Why We Exist</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mt-1 mr-3 flex-shrink-0" />
                      <p className="text-foreground-muted">Combat identity fraud and scams</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mt-1 mr-3 flex-shrink-0" />
                      <p className="text-foreground-muted">Help families reconnect with lost contacts</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mt-1 mr-3 flex-shrink-0" />
                      <p className="text-foreground-muted">Assist legal professionals in due diligence</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mt-1 mr-3 flex-shrink-0" />
                      <p className="text-foreground-muted">Support employers in background verification</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 bg-surface/50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Globe className="h-8 w-8 text-secondary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">Our Vision</h2>
          </div>
          <p className="text-xl text-foreground-muted mb-12 max-w-3xl mx-auto">
            To become the global standard for ethical people verification, setting new benchmarks for privacy protection while enabling legitimate identity verification needs.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {achievement.number}
                </div>
                <p className="text-foreground-muted">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg gradient-secondary text-white">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-foreground-muted text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-surface/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Our ethical verification process ensures accuracy while protecting privacy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center text-xl font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-foreground-muted text-sm">{step.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-warning-light border-warning">
            <CardContent className="p-12 text-center">
              <Shield className="h-16 w-16 mx-auto mb-6 text-warning" />
              <h2 className="text-3xl font-bold mb-4">Our Ethics Commitment</h2>
              <p className="text-lg text-foreground-muted mb-8 max-w-3xl mx-auto">
                We are committed to the highest ethical standards in data handling. All our data comes from publicly available sources, 
                and we never store sensitive information like Aadhaar details. Our platform is designed to be transparent, 
                accountable, and respectful of privacy rights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                  <h4 className="font-semibold mb-1">Public Data Only</h4>
                  <p className="text-sm text-foreground-muted">We only access publicly available information</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                  <h4 className="font-semibold mb-1">No Storage Policy</h4>
                  <p className="text-sm text-foreground-muted">Sensitive data is never stored on our servers</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                  <h4 className="font-semibold mb-1">Full Transparency</h4>
                  <p className="text-sm text-foreground-muted">Complete transparency in our processes and data sources</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="gradient-hero border-0 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join our mission to make people verification ethical, transparent, and accessible for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/search">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Start Searching
                  </Button>
                </Link>
                <Link to="/join">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Join Our Team
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

export default About;