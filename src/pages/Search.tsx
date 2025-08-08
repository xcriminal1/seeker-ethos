import { useState, useEffect } from "react"; // Import useEffect
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);

  // --- NEW: Simulate authentication state ---
  // In a real app, this would come from a global auth context or token check
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially false

  const navigate = useNavigate(); // Initialize navigate hook

  // --- NEW: Check login status on component mount (simulated) ---
  useEffect(() => {
    // In a real application, you would check for a token in localStorage,
    // a cookie, or from a global authentication context.
    // For this example, we'll just set it to false to force login.
    const userToken = localStorage.getItem('authToken'); // Example: check for a token
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // You might want to redirect immediately if not logged in
    // if (!isLoggedIn) {
    //   toast.warning("Please log in to use the search functionality.");
    //   navigate('/login');
    // }
  }, []); // Empty dependency array means this runs once on mount

  const handleSearch = async () => {
    // --- NEW: Authentication Check ---
    if (!isLoggedIn) {
      toast.warning("Please log in or sign up to use the search functionality.");
      navigate('/login'); // Redirect to your login page
      return; // Stop the search function
    }
    // --- END NEW: Authentication Check ---

    if (!query) {
      toast("Please enter search data");
      return;
    }

    setLoading(true);

    try {
      const backendUrl = "http://localhost:3000/api/data1/search";

      const searchParams = new URLSearchParams({
        query: query,
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

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Search by name, phone, aadhar, or address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          <Search className="w-4 h-4 mr-2" /> Search
        </Button>
        <Button variant="ghost" onClick={handleClear}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {results.length > 0 ? (
          results.map((person, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{person.Name}</h3>
              <p className="text-sm text-gray-600"><strong>Age:</strong> {person.Age}</p>
              <p className="text-sm text-gray-600"><strong>Gender:</strong> {person.Gender}</p>
              <p className="text-sm text-gray-600"><strong>PAN:</strong> {person.PAN}</p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {person.Email}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {person.Address}</p>
              <p className="text-sm text-gray-600"><strong>DL:</strong> {person.DL}</p>
              <p className="text-sm text-gray-600"><strong>Vehicle No:</strong> {person.Vehicle_Number}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {loading ? "Searching..." : "Enter a query and click search to find identity details."}
          </p>
        )}
      </div>
    </div>
  );
}