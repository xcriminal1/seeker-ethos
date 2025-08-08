import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  Database,
  FileText,
  Filter,
  Mail,
  MapPin,
  Phone,
  Search,
  Shield,
  User,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Search categories with icons and descriptions
  const searchCategories = [
    {
      id: "all",
      label: "All",
      icon: <Database className="h-5 w-5" />,
      placeholder: "Search by name, phone, address, aadhar, PAN, DL...",
      description: "Search across all available data types",
      examples: ["John Doe", "9876543210", "Delhi", "ABCDE1234F"]
    },
    {
      id: "name",
      label: "Name",
      icon: <User className="h-5 w-5" />,
      placeholder: "Enter full name or partial name...",
      description: "Search by person's name",
      examples: ["John Doe", "Amit Kumar", "Priya Sharma"]
    },
    {
      id: "phone", 
      label: "Phone",
      icon: <Phone className="h-5 w-5" />,
      placeholder: "Enter phone number...",
      description: "Search by mobile or landline number",
      examples: ["+91 9876543210", "9876543210", "011-23456789"]
    },
    {
      id: "address",
      label: "Address", 
      icon: <MapPin className="h-5 w-5" />,
      placeholder: "Enter address or location...",
      description: "Search by residential or office address",
      examples: ["Delhi", "Mumbai", "Sector 18 Noida"]
    },
    {
      id: "aadhar",
      label: "Aadhar",
      icon: <CreditCard className="h-5 w-5" />,
      placeholder: "Enter Aadhar number...",
      description: "Search by Aadhar card number",
      examples: ["1234 5678 9012", "123456789012"]
    },
    {
      id: "pan",
      label: "PAN",
      icon: <FileText className="h-5 w-5" />,
      placeholder: "Enter PAN number...",
      description: "Search by PAN card number", 
      examples: ["ABCDE1234F", "PANNO1234C"]
    },
    {
      id: "dl",
      label: "Driving License",
      icon: <Car className="h-5 w-5" />,
      placeholder: "Enter DL number...",
      description: "Search by driving license number",
      examples: ["DL123456789", "HR-0619850034761"]
    }
  ];

  const getCurrentCategory = () => {
    return searchCategories.find(cat => cat.id === searchType) || searchCategories[0];
  };

  // Check login status on component mount
  useEffect(() => {
    const userToken = localStorage.getItem('authToken');
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSearch = async () => {
    // Authentication Check
    if (!isLoggedIn) {
      toast.warning("Please log in or sign up to use the search functionality.");
      navigate('/login');
      return;
    }

    if (!query) {
      toast.error("Please enter search data");
      return;
    }

    setLoading(true);

    try {
      const backendUrl = "http://localhost:3000/api/data1/search";

      const searchParams = new URLSearchParams({
        query: query,
        type: searchType
      });

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
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary text-white">
              <Database className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            CyberDetect <span className="text-gradient">Search Portal</span>
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Comprehensive identity verification and data search platform. Search by name, phone, address, Aadhar, PAN, or driving license.
          </p>
        </div>

        {/* Search Categories */}
        <Card className="mb-8 border-card-border bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {searchCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={searchType === category.id ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center gap-2 ${
                    searchType === category.id 
                      ? "bg-gradient-to-br from-primary to-secondary text-white" 
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => {
                    setSearchType(category.id);
                    setQuery(""); // Clear previous query
                  }}
                >
                  {category.icon}
                  <span className="text-sm font-medium">{category.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Input Section */}
        <Card className="mb-8 border-card-border bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getCurrentCategory().icon}
              Search by {getCurrentCategory().label}
            </CardTitle>
            <p className="text-sm text-foreground-muted">{getCurrentCategory().description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder={getCurrentCategory().placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={loading}
                className="px-6 gradient-primary text-white border-0"
              >
                {loading ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClear}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Example searches */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-foreground-muted">Examples:</span>
              {getCurrentCategory().examples.map((example, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => setQuery(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="border-card-border bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Search Results
              {results.length > 0 && (
                <Badge variant="secondary">{results.length} found</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2">
                  <Clock className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-lg">Searching database...</span>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((person, index) => (
                  <Card key={index} className="border-card-border hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{person.Name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {person.Gender}, {person.Age} years
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {person.Email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-foreground-muted" />
                          <span>{person.Email}</span>
                        </div>
                      )}
                      {person.Phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-foreground-muted" />
                          <span>{person.Phone}</span>
                        </div>
                      )}
                      {person.Address && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-foreground-muted" />
                          <span className="line-clamp-2">{person.Address}</span>
                        </div>
                      )}
                      {person.PAN && (
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-foreground-muted" />
                          <span>PAN: {person.PAN}</span>
                        </div>
                      )}
                      {person.DL && (
                        <div className="flex items-center gap-2 text-sm">
                          <Car className="h-4 w-4 text-foreground-muted" />
                          <span>DL: {person.DL}</span>
                        </div>
                      )}
                      {person.Vehicle_Number && (
                        <div className="flex items-center gap-2 text-sm">
                          <Car className="h-4 w-4 text-foreground-muted" />
                          <span>Vehicle: {person.Vehicle_Number}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-foreground-muted/10">
                    <Database className="h-8 w-8 text-foreground-muted" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Ready to Search</h3>
                    <p className="text-foreground-muted">
                      Select a search category and enter your query to find identity details.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-foreground-muted">
            <AlertCircle className="h-4 w-4" />
            <span>All searches are logged for security and compliance purposes.</span>
          </div>
        </div>
      </div>
    </div>
  );
}