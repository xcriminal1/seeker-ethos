import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Linkedin, Users, Heart, Award } from "lucide-react";
import { teamMembers } from "@/data/mockData";

const Members = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 gradient-primary text-white border-0">
            <Users className="h-3 w-3 mr-1" />
            Our Team
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Meet Our <span className="text-gradient">Team</span>
          </h1>
          
          <p className="text-xl text-foreground-muted mb-8 max-w-3xl mx-auto">
            We're a diverse team of experts passionate about ethical technology, privacy protection, 
            and creating transparent solutions for people verification.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 gradient-card border-card-border">
              <CardContent className="p-0">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.role}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-foreground-muted mb-4 text-sm leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Linkedin className="h-3 w-3 mr-1" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { number: "6", label: "Team Members" },
            { number: "50+", label: "Years Combined Experience" },
            { number: "3", label: "Countries Represented" },
            { number: "100%", label: "Committed to Ethics" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <p className="text-foreground-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Drives Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Passion for Privacy",
                description: "We believe privacy is a fundamental right and work tirelessly to protect it while enabling legitimate verification needs."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Community First",
                description: "Our decisions are guided by what's best for our community and society, not just profit margins."
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Excellence in Ethics",
                description: "We set the highest standards for ethical data practices and transparent technology development."
              }
            ].map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg gradient-primary text-white">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-foreground-muted">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Advisory Board</h2>
          <Card className="bg-surface/50 border-card-border">
            <CardContent className="p-8 text-center">
              <p className="text-lg text-foreground-muted mb-6">
                Our advisory board consists of renowned experts in privacy law, data ethics, 
                and technology policy who guide our strategic decisions and ensure we maintain 
                the highest standards of ethical practice.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
                    DR
                  </div>
                  <h4 className="font-semibold">Dr. Rajesh Kumar</h4>
                  <p className="text-sm text-foreground-muted">Privacy Law Expert</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-secondary mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
                    AS
                  </div>
                  <h4 className="font-semibold">Anita Sharma</h4>
                  <p className="text-sm text-foreground-muted">Data Ethics Specialist</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-hero mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
                    MP
                  </div>
                  <h4 className="font-semibold">Prof. Michael Park</h4>
                  <p className="text-sm text-foreground-muted">Technology Policy Advisor</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Join Team CTA */}
        <Card className="gradient-hero border-0 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Join Our Mission?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our commitment to ethical technology and privacy protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Heart className="mr-2 h-5 w-5" />
                  Join Our Team
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Members;