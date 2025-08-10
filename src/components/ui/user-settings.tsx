import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Calendar,
    Camera,
    Mail,
    Phone,
    Save,
    Shield,
    User,
    X
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  plan: string;
  avatar: string;
  joinedDate: string;
  lastActive: string;
}

interface UserSettingsProps {
  onClose: () => void;
  onSave: (userData: UserData) => void;
}

const UserSettings = ({ onClose, onSave }: UserSettingsProps) => {
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    plan: "Pro",
    avatar: "",
    joinedDate: "",
    lastActive: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load current user data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setFormData(userData);
    }
  }, []);

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      // Validate required fields
      if (!formData.firstName.trim() || !formData.email.trim()) {
        toast.error("First name and email are required");
        return;
      }

      // Update localStorage
      const updatedUserData = {
        ...formData,
        lastActive: new Date().toISOString()
      };
      
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Call parent callback
      onSave(updatedUserData);
      
      toast.success("Profile updated successfully!");
      onClose();
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-primary/20">
                <AvatarImage src={formData.avatar} alt={`${formData.firstName} ${formData.lastName}`} />
                <AvatarFallback className="bg-primary text-white text-xl font-semibold">
                  {getInitials(formData.firstName, formData.lastName)}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="outline" 
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                onClick={() => toast.info("Photo upload feature coming soon!")}
              >
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="text-xs">
                {formData.plan} Plan
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-foreground">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-foreground">Account Information</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-foreground-muted flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Member Since
                </span>
                <span className="text-foreground">
                  {formData.joinedDate ? new Date(formData.joinedDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-muted flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  Plan
                </span>
                <Badge variant="outline" className="text-xs">
                  {formData.plan}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="flex-1 gradient-primary text-white"
            >
              {loading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettings;
