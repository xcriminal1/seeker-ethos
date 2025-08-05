import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Users, Code, Shield, Briefcase, GraduationCap, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";

const JoinUs = () => {
  const [formType, setFormType] = useState<"volunteer" | "partner" | "career">("volunteer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully! We'll review it and get back to you within 5 business days.");
  };

  const opportunities = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Volunteer",
      description: "Contribute to our mission in your spare time",
      color: "gradient-primary"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Partner",
      description: "Collaborate with us as an organization",
      color: "gradient-secondary"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Career",
      description: "Join our team as a full-time member",
      color: "gradient-hero"
    }
  ];

  const openPositions = [
    {
      title: "Senior Software Engineer",
      type: "Full-time",
      location: "Remote",
      department: "Engineering"
    },
    {
      title: "Data Privacy Specialist",
      type: "Full-time",
      location: "Bangalore",
      department: "Legal & Compliance"
    },
    {
      title: "UX/UI Designer",
      type: "Contract",
      location: "Remote",
      department: "Design"
    },
    {
      title: "DevOps Engineer",
      type: "Full-time",
      location: "Mumbai",
      department: "Engineering"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 gradient-primary text-white border-0">
            <Heart className="h-3 w-3 mr-1" />
            Join Our Mission
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Be Part of <span className="text-gradient">Something Bigger</span>
          </h1>
          
          <p className="text-xl text-foreground-muted mb-8 max-w-3xl mx-auto">
            Help us build the future of ethical people verification. Whether you want to volunteer, 
            partner with us, or join our team full-time, there's a place for you in our mission.
          </p>
        </div>

        {/* Opportunity Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {opportunities.map((opportunity, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                formType === opportunity.title.toLowerCase() ? 'ring-2 ring-primary shadow-glow' : ''
              }`}
              onClick={() => setFormType(opportunity.title.toLowerCase() as "volunteer" | "partner" | "career")}
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-lg mb-4 ${opportunity.color} text-white`}>
                  {opportunity.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{opportunity.title}</h3>
                <p className="text-foreground-muted">{opportunity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <Card className="gradient-card border-card-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                {formType === "volunteer" && <Heart className="h-6 w-6 text-primary" />}
                {formType === "partner" && <Users className="h-6 w-6 text-secondary" />}
                {formType === "career" && <Briefcase className="h-6 w-6 text-accent" />}
                {formType === "volunteer" && "Volunteer Application"}
                {formType === "partner" && "Partnership Inquiry"}
                {formType === "career" && "Career Application"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" required />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" />
                </div>

                {/* Role-specific fields */}
                {formType === "volunteer" && (
                  <>
                    <div>
                      <Label htmlFor="skills">Skills & Expertise</Label>
                      <Textarea 
                        id="skills" 
                        placeholder="Tell us about your skills and areas of expertise..."
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="availability">Time Commitment</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="How much time can you commit?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-5">2-5 hours per week</SelectItem>
                          <SelectItem value="5-10">5-10 hours per week</SelectItem>
                          <SelectItem value="10-20">10-20 hours per week</SelectItem>
                          <SelectItem value="20+">20+ hours per week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="areas">Areas of Interest</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {["Data Privacy", "Legal Research", "UI/UX Design", "Software Development", "Content Writing", "Community Management"].map((area) => (
                          <div key={area} className="flex items-center space-x-2">
                            <Checkbox id={area} />
                            <Label htmlFor={area} className="text-sm">{area}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {formType === "partner" && (
                  <>
                    <div>
                      <Label htmlFor="organization">Organization Name *</Label>
                      <Input id="organization" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" type="url" placeholder="https://" />
                    </div>
                    
                    <div>
                      <Label htmlFor="partnershipType">Partnership Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="What type of partnership are you interested in?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology Integration</SelectItem>
                          <SelectItem value="data">Data Partnership</SelectItem>
                          <SelectItem value="research">Research Collaboration</SelectItem>
                          <SelectItem value="distribution">Distribution Partnership</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {formType === "career" && (
                  <>
                    <div>
                      <Label htmlFor="position">Position of Interest</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                        <SelectContent>
                          {openPositions.map((position, index) => (
                            <SelectItem key={index} value={position.title}>
                              {position.title} - {position.type}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">Other / General Application</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-2">0-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="resume">Resume/CV</Label>
                      <Input id="resume" type="file" accept=".pdf,.doc,.docx" />
                      <p className="text-xs text-foreground-muted mt-1">
                        Accepted formats: PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="message">
                    {formType === "volunteer" && "Why do you want to volunteer with us?"}
                    {formType === "partner" && "Tell us about your partnership proposal"}
                    {formType === "career" && "Cover Letter / Additional Information"}
                  </Label>
                  <Textarea 
                    id="message" 
                    placeholder={
                      formType === "volunteer" 
                        ? "Share your motivation and how you'd like to contribute..."
                        : formType === "partner"
                        ? "Describe your partnership idea and how we can work together..."
                        : "Tell us why you'd be a great fit for our team..."
                    }
                    className="min-h-[120px]"
                    required
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the terms and conditions and understand that my information will be used 
                    to evaluate my application and communicate with me about opportunities at PeopleFinder.
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full gradient-primary text-white border-0 hover:shadow-glow transition-all duration-300"
                >
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Information Panel */}
          <div className="space-y-8">
            {/* Why Join Us */}
            <Card className="gradient-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Why Join PeopleFinder?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/10 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Make a Real Impact</h4>
                    <p className="text-sm text-foreground-muted">Help build ethical technology that protects privacy while serving legitimate needs</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-secondary/10 mt-1">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Learn & Grow</h4>
                    <p className="text-sm text-foreground-muted">Work with experts in data privacy, ethics, and cutting-edge technology</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-accent/10 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <div>
                    <h4 className="font-medium">Flexible & Remote</h4>
                    <p className="text-sm text-foreground-muted">Work from anywhere with flexible hours and supportive team culture</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Open Positions */}
            {formType === "career" && (
              <Card className="gradient-card border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-accent" />
                    Open Positions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {openPositions.map((position, index) => (
                    <div key={index} className="p-3 rounded-lg bg-surface border border-border">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">{position.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {position.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-foreground-muted">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {position.department}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Contact */}
            <Card className="gradient-hero border-0 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Questions?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Have questions about joining our team? We'd love to hear from you.
                </p>
                <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;