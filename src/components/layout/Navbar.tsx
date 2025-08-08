import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/useTheme";
import { LogOut, Menu, Moon, Settings, Shield, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    plan: string;
    avatar: string;
  } | null>(null);
  const { theme, setTheme } = useTheme();

  // Check authentication status
  useEffect(() => {
    const userToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    
    if (userToken && userId) {
      setIsLoggedIn(true);
      // Simulate user data - in real app, fetch from API
      setUserData({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        plan: "Pro",
        avatar: ""
      });
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    toast.success("Signed out successfully!");
    setIsProfileOpen(false);
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Members", href: "/members" },
    { name: "Join Us", href: "/join" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-card-border bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-1 w-8 items-center justify-center rounded-md bg-gradient-to-r">
              <img
                src="/logo.webp"
                alt="CyberDetect Logo"
                className="h-6 w-6 rounded-md object-cover"
                />
            </div>
            <span className="text-xl font-bold text-gradient">CyberDetect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            
            {isLoggedIn && userData ? (
              <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 p-2 h-auto">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userData.avatar} alt={`${userData.firstName} ${userData.lastName}`} />
                      <AvatarFallback className="bg-primary text-white text-sm">
                        {getInitials(userData.firstName, userData.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{userData.firstName}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] p-0">
                  <div className="flex flex-col h-full">
                    {/* Profile Header */}
                    <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-b">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                          <AvatarImage src={userData.avatar} alt={`${userData.firstName} ${userData.lastName}`} />
                          <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                            {getInitials(userData.firstName, userData.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-foreground">
                            {userData.firstName} {userData.lastName}
                          </h2>
                          <p className="text-sm text-foreground-muted">{userData.email}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {userData.plan} Plan
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Profile Content */}
                    <div className="flex-1 p-6 space-y-4">
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-3" />
                          Account Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <Shield className="h-4 w-4 mr-3" />
                          Security Settings
                        </Button>
                      </div>
                    </div>

                    {/* Profile Footer */}
                    <div className="border-t p-4">
                      <Button 
                        variant="destructive" 
                        size="lg"
                        className="w-full"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              </>
            )}
            <Link to="/search">
              <Button size="sm" className="gradient-primary text-white border-0">
                <Shield className="h-4 w-4 mr-2" />
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 pt-6">
                <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-primary">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gradient">CyberDetect</span>
                </Link>
                
                <div className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        isActive(item.href) ? "text-primary" : "text-foreground-muted"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-3 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">Theme</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                    >
                      {theme === 'light' ? (
                        <Moon className="h-4 w-4" />
                      ) : (
                        <Sun className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  {isLoggedIn && userData ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={userData.avatar} alt={`${userData.firstName} ${userData.lastName}`} />
                          <AvatarFallback className="bg-primary text-white text-sm">
                            {getInitials(userData.firstName, userData.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{userData.firstName} {userData.lastName}</div>
                          <div className="text-xs text-foreground-muted">{userData.plan} Plan</div>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={() => {
                          setIsOpen(false);
                          handleSignOut();
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <User className="h-4 w-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                    </>
                  )}
                  
                  <Link to="/search" onClick={() => setIsOpen(false)}>
                    <Button className="w-full gradient-primary text-white border-0">
                      <Shield className="h-4 w-4 mr-2" />
                      Start Learning
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;