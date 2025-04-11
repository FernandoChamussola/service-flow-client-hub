
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Solicitar Serviço", path: "/request-service" },
    { name: "Propostas", path: "/proposals" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-marketplace-primary to-marketplace-secondary flex items-center justify-center text-white font-bold">M</div>
            <span className="text-xl font-semibold text-gray-900">Marketplace</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? "text-marketplace-primary"
                  : "text-gray-700 hover:text-marketplace-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-marketplace-danger"></span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5 text-gray-700" />
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-700" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 animate-fade-in">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive(link.path)
                    ? "bg-marketplace-primary/10 text-marketplace-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <hr className="border-gray-200 my-2" />
            
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              <span>Perfil</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
