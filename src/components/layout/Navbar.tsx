import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/useTheme";
import { Menu, Moon, Search, Sun, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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
            <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-primary">
              <Search className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">PeopleFinder</span>
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
            <Link to="/login">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/search">
              <Button size="sm" className="gradient-primary text-white border-0">
                <Search className="h-4 w-4 mr-2" />
                Search Now
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
                    <Search className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gradient">PeopleFinder</span>
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
                  
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  
                  <Link to="/search" onClick={() => setIsOpen(false)}>
                    <Button className="w-full gradient-primary text-white border-0">
                      <Search className="h-4 w-4 mr-2" />
                      Search Now
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