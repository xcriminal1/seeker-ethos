import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Star, Zap, Crown, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      icon: <User className="h-6 w-6" />,
      description: "Perfect for occasional searches",
      monthlyPrice: 499,
      yearlyPrice: 5499,
      yearlyDiscount: "17% off",
      features: [
        "10 searches per month",
        "Basic profile information",
        "Phone number lookup",
        "Email support",
        "Standard verification"
      ],
      popular: false,
      color: "border-card-border"
    },
    {
      id: "professional",
      name: "Professional",
      icon: <Zap className="h-6 w-6" />,
      description: "For professionals and businesses",
      monthlyPrice: 2229,
      yearlyPrice: 22290,
      yearlyDiscount: "14% off",
      features: [
        "100 searches per month",
        "Detailed profile information",
        "Photo search capability",
        "Aadhaar verification",
        "Priority email support",
        "Advanced filters",
        "Batch processing",
        "Export results"
      ],
      popular: true,
      color: "border-primary gradient-primary"
    },
    {
      id: "premium",
      name: "Premium",
      icon: <Crown className="h-6 w-6" />,
      description: "For enterprises and heavy users",
      monthlyPrice: 19999,
      yearlyPrice: 179999,
      yearlyDiscount: "16% off",
      features: [
        "Unlimited searches",
        "Complete profile data",
        "Real-time verification",
        "API access",
        "24/7 phone support",
        "Custom integrations",
        "White-label options",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom reporting"
      ],
      popular: false,
      color: "border-accent"
    }
  ];

  const handleEnquireNow = (planId: string) => {
    setSelectedPlan(planId);
    setIsDialogOpen(true);
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Enquiry submitted successfully! We'll contact you within 24 hours.");
    setIsDialogOpen(false);
  };

  const getPrice = (plan: typeof plans[0]) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (!isYearly) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.yearlyPrice;
    return savings;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 gradient-primary text-white border-0">
            <Star className="h-3 w-3 mr-1" />
            Flexible Pricing
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your <span className="text-gradient">Plan</span>
          </h1>
          
          <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
            Select the perfect plan for your people verification needs. All plans include our ethical data practices and secure infrastructure.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-foreground-muted'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-foreground-muted'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge variant="secondary" className="ml-2 gradient-secondary text-white border-0">
                Save up to 17%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'scale-105 shadow-glow' : 'hover:-translate-y-2'
              } ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="gradient-primary text-white border-0 px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`inline-flex p-3 rounded-lg mb-4 mx-auto ${
                  plan.popular ? 'gradient-primary text-white' : 'bg-surface text-primary'
                }`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="text-foreground-muted">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl md:text-5xl font-bold">
                      ₹{getPrice(plan)}
                    </span>
                    <span className="text-foreground-muted ml-2">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && plan.yearlyDiscount && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-success border-success">
                        {plan.yearlyDiscount}
                      </Badge>
                      <p className="text-sm text-foreground-muted mt-1">
                        Save ₹{getSavings(plan)} annually
                      </p>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-success mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm text-foreground-muted">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  onClick={() => handleEnquireNow(plan.id)}
                  className={`w-full h-12 ${
                    plan.popular 
                      ? 'gradient-primary text-white border-0 hover:shadow-glow' 
                      : 'border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Enquire Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">All Plans Include</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Check className="h-5 w-5" />, title: "Ethical Data Sources", description: "Only publicly available information" },
              { icon: <Check className="h-5 w-5" />, title: "Privacy Protection", description: "No sensitive data storage" },
              { icon: <Check className="h-5 w-5" />, title: "Secure Infrastructure", description: "Enterprise-grade security" },
              { icon: <Check className="h-5 w-5" />, title: "Legal Compliance", description: "Full regulatory compliance" }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-3">
                    <div className="p-2 rounded-lg bg-success text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground-muted">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Is there a free trial?",
                answer: "We offer a 7-day free trial for all paid plans so you can test our service before committing."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, UPI, and bank transfers for Indian customers."
              },
              {
                question: "Do you offer enterprise solutions?",
                answer: "Yes, we provide custom enterprise solutions with dedicated support and custom integrations."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-foreground-muted text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enquiry Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Contact Us for {selectedPlan} Plan</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitEnquiry} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required />
              </div>
              
              <div>
                <Label htmlFor="company">Company/Organization</Label>
                <Input id="company" />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your requirements..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 gradient-primary text-white border-0">
                  Submit Enquiry
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Pricing;