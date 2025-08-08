import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Car, CreditCard, FileText, Filter, LogOut, MapPin, Phone, Search, Settings, Shield, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  plan: string;
  avatar: string;
}

interface SearchResult {
  Name: string;
  Age: number;
  Gender: string;
  PAN: string;
  Email: string;
  Address: string;
  DL: string;
  Vehicle_Number: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // --- Authentication state ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  // Check login status and load user data
  useEffect(() => {
    const userToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    
    if (userToken && userId) {
      setIsLoggedIn(true);
      // Simulate user data - in real app, fetch from API
      setUserData({
        id: userId,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+91 9876543210",
        plan: "Pro",
        avatar: ""
      });
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, []);

  const searchCategories = [
    { id: "all", label: "All", icon: Shield, color: "bg-primary" },
    { id: "name", label: "Name", icon: User, color: "bg-blue-500" },
    { id: "phone", label: "Phone", icon: Phone, color: "bg-green-500" },
    { id: "address", label: "Address", icon: MapPin, color: "bg-orange-500" },
    { id: "aadhar", label: "Aadhar", icon: FileText, color: "bg-purple-500" },
    { id: "pan", label: "PAN", icon: CreditCard, color: "bg-red-500" },
    { id: "dl", label: "DL", icon: Car, color: "bg-yellow-500" }
  ];

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

  const handleSearch = async () => {
    if (!isLoggedIn) {
      toast.warning("Please log in or sign up to use the search functionality.", {
        action: {
          label: "Login",
          onClick: () => navigate('/login')
        }
      });
      navigate('/login');
      return;
    }

    if (!query) {
      toast("Please enter search data");
      return;
    }

    setLoading(true);

    try {
      const backendUrl = "http://localhost:3000/api/data1/search";
      const searchParams = new URLSearchParams({ query: query });
      const response = await fetch(`${backendUrl}?${searchParams.toString()}`);

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const searchResults = await response.json();
      setResults(searchResults);

      if (searchResults.length === 0) {
        toast.info("No results found. Try adjusting your search criteria.");
      } else {
        toast.success(`Found ${searchResults.length} result(s)`);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to fetch data from the server. Check your network connection and backend status.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header with User Profile */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
              CyberDetect Search
            </h1>
            <p className="text-foreground-muted">
              Advanced people verification and identity search platform
            </p>
          </div>
          
          {/* User Profile Section */}
          {isLoggedIn && userData ? (
            <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 p-2 h-auto">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userData.avatar} alt={`${userData.firstName} ${userData.lastName}`} />
                    <AvatarFallback className="bg-primary text-white text-sm">
                      {getInitials(userData.firstName, userData.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden md:block">
                    <div className="font-medium text-sm">{userData.firstName} {userData.lastName}</div>
                    <div className="text-xs text-foreground-muted">{userData.plan} Plan</div>
                  </div>
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
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate('/login')}>
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button onClick={() => navigate('/signup')} className="gradient-primary text-white">
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Search Categories */}
        <Card className="gradient-card border-card-border shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {searchCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className={`flex flex-col items-center gap-2 h-auto py-3 ${
                      selectedCategory === category.id 
                        ? "gradient-primary text-white" 
                        : "hover:bg-secondary/10"
                    }`}
                    onClick={() => {
                      if (!isLoggedIn) {
                        toast.warning("Please log in to use search categories.");
                        navigate('/login');
                        return;
                      }
                      setSelectedCategory(category.id);
                    }}
                    disabled={!isLoggedIn}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{category.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <Card className="gradient-card border-card-border shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                <Input
                  placeholder={isLoggedIn ? "Search by name, phone, aadhar, address, or any identifier..." : "Please login to start searching..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-base"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  disabled={!isLoggedIn}
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={loading || !isLoggedIn}
                className="gradient-primary text-white px-6 py-3"
              >
                {loading ? "Searching..." : "Search"}
              </Button>
              <Button variant="outline" onClick={handleClear} className="px-4 py-3">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {!isLoggedIn && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-yellow-600" />
                  <p className="text-sm text-yellow-700 font-medium">
                    Login required to access search functionality
                  </p>
                </div>
                <p className="text-xs text-yellow-600 mt-1">
                  Please log in to your account to search our secure database.
                </p>
              </div>
            )}
            
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="mb-2">
                Searching in: {searchCategories.find(c => c.id === selectedCategory)?.label}
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.length > 0 ? (
            results.map((person, index) => (
              <Card key={index} className="gradient-card border-card-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground">{person.Name}</CardTitle>
                    <Badge variant="outline" className="text-xs">ID #{index + 1}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-foreground-muted font-medium">Age:</span>
                      <p className="text-foreground">{person.Age}</p>
                    </div>
                    <div>
                      <span className="text-foreground-muted font-medium">Gender:</span>
                      <p className="text-foreground">{person.Gender}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-3 w-3 text-foreground-muted" />
                      <span className="text-foreground-muted">PAN:</span>
                      <span className="text-foreground font-mono">{person.PAN}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-foreground-muted" />
                      <span className="text-foreground-muted">Email:</span>
                      <span className="text-foreground">{person.Email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3 w-3 text-foreground-muted mt-0.5" />
                      <div>
                        <span className="text-foreground-muted">Address:</span>
                        <p className="text-foreground leading-tight">{person.Address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="h-3 w-3 text-foreground-muted" />
                      <span className="text-foreground-muted">DL:</span>
                      <span className="text-foreground font-mono">{person.DL}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="h-3 w-3 text-foreground-muted" />
                      <span className="text-foreground-muted">Vehicle:</span>
                      <span className="text-foreground font-mono">{person.Vehicle_Number}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card className="gradient-card border-card-border shadow-lg">
                <CardContent className="p-12 text-center">
                  {loading ? (
                    <div className="space-y-4">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-lg text-foreground-muted">Searching our secure database...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Search className="w-16 h-16 text-foreground-muted mx-auto" />
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Search</h3>
                        <p className="text-foreground-muted max-w-md mx-auto">
                          Enter a name, phone number, address, Aadhar, PAN, or any identifier to find identity details from our secure database.
                        </p>
                      </div>
                      {!isLoggedIn && (
                        <div className="mt-6">
                          <Button onClick={() => navigate('/login')} className="gradient-primary text-white">
                            <User className="h-4 w-4 mr-2" />
                            Login to Start Searching
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {isLoggedIn && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="gradient-card border-card-border">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-foreground-muted">Data Accuracy</div>
              </CardContent>
            </Card>
            <Card className="gradient-card border-card-border">
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">2.5M+</div>
                <div className="text-sm text-foreground-muted">Records Available</div>
              </CardContent>
            </Card>
            <Card className="gradient-card border-card-border">
              <CardContent className="p-4 text-center">
                <User className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-foreground-muted">Trusted Users</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}