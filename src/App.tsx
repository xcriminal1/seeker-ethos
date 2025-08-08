import React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";

// Your teammate's pages
import AadhaarSearch from "./pages/AadhaarSearch";
import About from "./pages/About";
import Index from "./pages/Index";
import JoinUs from "./pages/JoinUs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Search from "./pages/Search";
import Signup from "./pages/Signup";

// ✅ If you want to show data from /api/data1 in some specific page like `Search.tsx`, move the logic there.

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/join" element={<JoinUs />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/aadhaar-search" element={<AadhaarSearch />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
