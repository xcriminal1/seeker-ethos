import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkBackendHealth, tryAlternativeAuth } from "@/lib/backend-utils";
import { Eye, EyeOff, Lock, Mail, Phone, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "sonner";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "", // This field is collected but not sent to backend for registration in current auth.js
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // Initialize navigate hook

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return false;
    }

    return true;
  };

  const handleSignup = async (e: React.FormEvent) => { // Make function async
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true); // Set loading to true

    try {
      console.log("Attempting registration with data:", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        // Don't log password for security
      });

      // First check if backend is healthy
      const healthCheck = await checkBackendHealth();
      if (!healthCheck.isHealthy) {
        toast.error(healthCheck.message);
        return;
      }

      // Try the registration with alternative endpoints
      const response = await tryAlternativeAuth("auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      console.log("Registration response status:", response.status);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        // If not JSON, get text response
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);
        throw new Error("Server returned non-JSON response");
      }

      console.log("Registration response data:", data);

      if (response.ok) {
        toast.success(data.message || "Account created successfully! Redirecting to login...");
        
        // Store user data for later use (always store, regardless of backend response)
        localStorage.setItem('userData', JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          joinDate: new Date().toISOString()
        }));
        
        // Wait a moment before redirect
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(data.error || data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      
      // More specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast.error("Cannot connect to server. Please check if the backend is running on http://localhost:3000");
      } else if (error.message.includes("non-JSON")) {
        toast.error("Server error: Invalid response format. Please contact support.");
      } else {
        toast.error("An error occurred during registration. Please try again later.");
      }
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">CyberDetect</span>
          </Link>
        </div>

        <Card className="gradient-card border-card-border shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Join CyberDetect</CardTitle>
            <p className="text-foreground-muted">
              Develop skills in cybersecurity and programming from professional tech experts
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="pl-10"
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-foreground-muted">
                  Must be at least 8 characters with letters and numbers
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:text-primary-dark">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:text-primary-dark">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={formData.agreeToMarketing}
                    onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked)}
                  />
                  <Label htmlFor="marketing" className="text-sm leading-relaxed">
                    I agree to receive updates about new features and security alerts (optional)
                  </Label>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full gradient-primary text-white border-0 hover:shadow-glow transition-all duration-300"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Registering..." : "Join CyberDetect"}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-foreground-muted">Or sign up with</span>
                </div>
              </div>

              {/* Social Sign Up */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="w-full">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-foreground-muted">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ethics Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-foreground-muted max-w-sm mx-auto">
            Join CyberDetect education center and develop skills from professional tech experts. 
            Specializing in cybersecurity, programming, data science, and cloud computing.
          </p>
        </div>

        {/* Backend Status Notice */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
            <strong>Note:</strong> If you encounter connection errors, please ensure the backend server is running on port 3000.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
