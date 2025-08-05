import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, MapPin, Phone, Calendar, User, Verified, Camera, FileText } from "lucide-react";
import { toast } from "sonner";
import { searchPeople, cities, states, type Person } from "@/data/mockData";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!query.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const searchResults = searchPeople(query, {
        city: selectedCity || undefined,
        state: selectedState || undefined,
        gender: selectedGender || undefined,
        ageRange: ageRange
      });
      
      setResults(searchResults);
      setLoading(false);
      
      if (searchResults.length === 0) {
        toast.info("No results found. Try adjusting your search criteria.");
      } else {
        toast.success(`Found ${searchResults.length} result(s)`);
      }
    }, 1000);
  };

  const clearFilters = () => {
    setSelectedCity("");
    setSelectedState("");
    setSelectedGender("");
    setAgeRange([18, 65]);
  };

  const getMatchConfidence = (person: Person): number => {
    // Simulate confidence calculation based on verification and data completeness
    let confidence = person.verified ? 85 : 60;
    if (person.profession) confidence += 10;
    if (person.lastSeen) confidence += 5;
    return Math.min(confidence, 95);
  };

  // Search on page load if query parameter exists
  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Search People
          </h1>
          <p className="text-foreground-muted text-lg">
            Find verified profiles using name, phone number, or other identifiers
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 gradient-card border-card-border">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-6">
              {/* Main Search */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Enter name, phone number, or keyword..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-12 pl-12 text-lg"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground-muted" />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12 px-6"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button 
                    type="submit" 
                    className="h-12 px-8 gradient-primary text-white border-0"
                    disabled={loading}
                  >
                    {loading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="border-t border-border pt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">City</label>
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Cities</SelectItem>
                          {cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">State</label>
                      <Select value={selectedState} onValueChange={setSelectedState}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All States</SelectItem>
                          {states.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Gender</label>
                      <Select value={selectedGender} onValueChange={setSelectedGender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Genders</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Age Range: {ageRange[0]} - {ageRange[1]}
                      </label>
                      <Slider
                        value={ageRange}
                        onValueChange={(value) => setAgeRange(value as [number, number])}
                        min={18}
                        max={80}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                    <p className="text-sm text-foreground-muted">
                      Apply filters to narrow down your search results
                    </p>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Search Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">Photo Search</h3>
              <p className="text-sm text-foreground-muted">Upload a photo to find matches</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Phone className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <h3 className="font-medium">Reverse Phone</h3>
              <p className="text-sm text-foreground-muted">Find owner by phone number</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-accent" />
              <h3 className="font-medium">Aadhaar Search</h3>
              <p className="text-sm text-foreground-muted">Verify with Aadhaar card</p>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground-muted">Searching for matches...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                Search Results ({results.length})
              </h2>
              <p className="text-foreground-muted">
                Showing results for "{query}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((person) => (
                <Card key={person.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg truncate">{person.name}</h3>
                          {person.verified && (
                            <Verified className="h-4 w-4 text-success" />
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-foreground-muted">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {person.city}, {person.state}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {person.phone}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {person.age} years old
                          </div>
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {person.profession || "Not specified"}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <Badge 
                            variant={person.verified ? "default" : "secondary"}
                            className={person.verified ? "gradient-primary text-white border-0" : ""}
                          >
                            {getMatchConfidence(person)}% Match
                          </Badge>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : query && !loading ? (
          <Card className="py-12">
            <CardContent className="text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-foreground-muted" />
              <h3 className="text-xl font-medium mb-2">No Results Found</h3>
              <p className="text-foreground-muted mb-4">
                We couldn't find any matches for "{query}". Try adjusting your search criteria.
              </p>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                Adjust Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="py-12">
            <CardContent className="text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-foreground-muted" />
              <h3 className="text-xl font-medium mb-2">Start Your Search</h3>
              <p className="text-foreground-muted">
                Enter a name, phone number, or keyword to begin searching
              </p>
            </CardContent>
          </Card>
        )}

        {/* Ethics Disclaimer */}
        <Card className="mt-12 bg-warning-light border-warning">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-warning text-white mt-1">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium mb-2 text-warning">Important Ethics Notice</h4>
                <p className="text-sm text-foreground-muted">
                  This platform is designed for legal and ethical use only. All data is ethically sourced from public records. 
                  Aadhaar information is never stored and is used only for real-time verification. Please use this service responsibly 
                  and in compliance with applicable privacy laws.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;