import { useState } from "react";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onAuthClick: () => void;
  onSearchChange: (query: string) => void;
}

const Header = ({ cartItemCount, onCartClick, onAuthClick, onSearchChange }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      {/* Top bar with offer */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        🎉 Welcome to Nigeria's #1 Online Marketplace! Free delivery on orders above ₦5,000
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">NaijaKart</div>
            <span className="text-sm text-muted-foreground hidden md:block">Nigeria's Marketplace</span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for fresh foods, vegetables, fruits, snacks..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Login/Signup Button */}
            <Button
              variant="outline"
              onClick={onAuthClick}
              className="hidden md:flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Login/Signup</span>
            </Button>

            {/* Cart Button */}
            <Button
              variant="outline"
              onClick={onCartClick}
              className="relative flex items-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t mt-4 pt-4">
            <Button
              variant="outline"
              onClick={onAuthClick}
              className="w-full mb-2 flex items-center justify-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Login/Signup</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;