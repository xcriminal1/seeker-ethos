import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Award,
    BookOpen,
    Calendar,
    ChevronDown,
    LogOut,
    Mail,
    Settings,
    Shield,
    User
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  joinDate: string;
  userId: string;
}

const UserProfilePopup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get stored user data from localStorage or backend
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const authToken = localStorage.getItem('authToken');
        
        if (!userId || !authToken) {
          setLoading(false);
          return;
        }

        // Try to fetch from backend first (optional - only if you have a profile endpoint)
        try {
          const response = await fetch(`http://localhost:3000/auth/profile/${userId}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const backendUserData = await response.json();
            setUserData({
              firstName: backendUserData.firstName || "User",
              lastName: backendUserData.lastName || "",
              email: backendUserData.email || "user@cyberdetect.com",
              joinDate: new Date(backendUserData.createdAt || Date.now()).toLocaleDateString(),
              userId: userId
            });
          } else {
            throw new Error('Backend fetch failed');
          }
        } catch (backendError) {
          // Fallback to stored data or mock data if backend fails
          console.log("Using fallback user data");
          
          // Try to get stored user data first
          const storedUserData = localStorage.getItem('userData');
          let fallbackData: UserData;
          
          if (storedUserData) {
            try {
              const parsed = JSON.parse(storedUserData);
              fallbackData = {
                firstName: parsed.firstName || "CyberDetect",
                lastName: parsed.lastName || "Student",
                email: parsed.email || "student@cyberdetect.com",
                joinDate: new Date(parsed.joinDate || Date.now()).toLocaleDateString(),
                userId: userId
              };
            } catch {
              fallbackData = {
                firstName: "CyberDetect", 
                lastName: "Student",
                email: "student@cyberdetect.com",
                joinDate: new Date().toLocaleDateString(),
                userId: userId
              };
            }
          } else {
            fallbackData = {
              firstName: "CyberDetect", 
              lastName: "Student",
              email: "student@cyberdetect.com",
              joinDate: new Date().toLocaleDateString(),
              userId: userId
            };
          }
          
          setUserData(fallbackData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Clear all authentication and user data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    
    // Show success message
    toast.success("Logged out successfully!");
    
    // Redirect to home page
    navigate('/');
    
    // Optionally refresh the page to reset all state
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <Button variant="ghost" size="sm" className="animate-pulse">
        <User className="h-4 w-4" />
      </Button>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center space-x-3 hover:bg-primary/10 transition-colors rounded-lg px-3 py-2 border border-transparent hover:border-primary/20"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium text-sm shadow-md">
              {getInitials(userData.firstName, userData.lastName)}
            </div>
            {/* Online status indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium text-foreground">
              {userData.firstName} {userData.lastName}
            </span>
            <span className="text-xs text-primary font-medium">
              Active Student
            </span>
          </div>
          <ChevronDown className="h-3 w-3 text-foreground-muted" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-96 p-0">
        <Card className="border-0 shadow-none h-full">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {getInitials(userData.firstName, userData.lastName)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-foreground">
                  {userData.firstName} {userData.lastName}
                </h3>
                <p className="text-sm text-foreground-muted flex items-center mt-1">
                  <Mail className="h-3 w-3 mr-1" />
                  {userData.email}
                </p>
                <div className="flex items-center text-xs text-foreground-muted mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  Joined {userData.joinDate}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center pt-3">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>Active Student</span>
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-4">
            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border">
              <div className="text-center">
                <div className="flex flex-col items-center space-y-1">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-xs text-foreground-muted">Courses</span>
                  <span className="text-lg font-semibold text-foreground">3</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex flex-col items-center space-y-1">
                  <Award className="h-5 w-5 text-secondary" />
                  <span className="text-xs text-foreground-muted">Certificates</span>
                  <span className="text-lg font-semibold text-foreground">1</span>
                </div>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start space-x-3 h-12 hover:bg-primary/10 transition-colors">
                <User className="h-4 w-4 text-primary" />
                <span>Profile Settings</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start space-x-3 h-12 hover:bg-primary/10 transition-colors">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>My Courses</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start space-x-3 h-12 hover:bg-primary/10 transition-colors">
                <Award className="h-4 w-4 text-secondary" />
                <span>Certificates</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start space-x-3 h-12 hover:bg-primary/10 transition-colors">
                <Settings className="h-4 w-4 text-primary" />
                <span>Account Settings</span>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border">
              <h4 className="text-sm font-medium text-foreground mb-2">Learning Progress</h4>
              <div className="text-xs text-foreground-muted">
                <div className="flex justify-between mb-1">
                  <span>Cybersecurity Fundamentals</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-border rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
            
            {/* Logout Button */}
            <div className="pt-2 border-t">
              <Button 
                variant="destructive" 
                className="w-full justify-start space-x-3 h-12 hover:bg-red-600 transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default UserProfilePopup;
