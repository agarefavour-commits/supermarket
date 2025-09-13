import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Layout/Header";
import AuthModal from "@/components/Auth/AuthModal";
import ProductGrid from "@/components/Product/ProductGrid";
import CartSidebar, { CartItem } from "@/components/Cart/CartSidebar";
import CheckoutModal from "@/components/Checkout/CheckoutModal";
import ChatWidget from "@/components/Chatbot/ChatWidget";
import { Button } from "@/components/ui/button";
import { products, getProductsByCategory, searchProducts, Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Auto-show auth modal after 10 seconds if not logged in
  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("naija_kart_current_user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      // Show auth modal after 10 seconds if not logged in
      const timer = setTimeout(() => {
        setShowAuthModal(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Load cart items from localStorage
  useEffect(() => {
    if (currentUser) {
      const storedCart = localStorage.getItem(`naija_kart_cart_${currentUser.email}`);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, [currentUser]);

  // Save cart items to localStorage whenever cart changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`naija_kart_cart_${currentUser.email}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  // Filter products based on category and search
  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== "All") {
      filtered = getProductsByCategory(selectedCategory);
    }
    
    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery).filter(product => 
        selectedCategory === "All" || product.category === selectedCategory
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  const handleAuthSuccess = (userData: { email: string; name: string }) => {
    setCurrentUser(userData);
    setShowAuthModal(false);
  };

  const handleAddToCart = (product: Product) => {
    // Check if user is logged in
    if (!currentUser) {
      setShowAuthModal(true);
      toast({
        title: "Login Required",
        description: "Please login or signup to add items to your cart.",
        variant: "destructive",
      });
      return;
    }

    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(prev => prev.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newCartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        unit: product.unit,
      };
      setCartItems(prev => [...prev, newCartItem]);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setShowCartSidebar(false);
    setShowCheckoutModal(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    setShowCheckoutModal(false);
    toast({
      title: "Order Placed! 🎉",
      description: "Thank you for shopping with NaijaKart!",
    });
  };

  const handleViewProduct = (product: Product) => {
    // For now, just show a toast. In a real app, this would open a product detail modal
    toast({
      title: product.name,
      description: product.description,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onCartClick={() => setShowCartSidebar(true)}
        onAuthClick={() => setShowAuthModal(true)}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-primary">PTI SUPER MARKET</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            pti's premier online marketplace for fresh vegetables, fruits, grains, and authentic local products. 
            Shop from the comfort of your home and get fresh groceries delivered to your doorstep!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/about")} variant="outline" size="lg">
              Learn More About Us
            </Button>
            {!currentUser && (
              <Button onClick={() => setShowAuthModal(true)} size="lg">
                Sign Up to Start Shopping
              </Button>
            )}
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Vegetables", "Fruits", "Grains & Rice", "Snacks"].map((category) => (
              <div
                key={category}
                className="bg-card rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition-shadow border"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="text-4xl mb-2">
                  {category === "Vegetables" && "🥬"}
                  {category === "Fruits" && "🍊"}
                  {category === "Grains & Rice" && "🌾"}
                  {category === "Snacks" && "🥜"}
                </div>
                <h3 className="font-semibold">{category}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onViewProduct={handleViewProduct}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </main>

      {/* Modals and Sidebars */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <CartSidebar
        isOpen={showCartSidebar}
        onClose={() => setShowCartSidebar(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Chatbot */}
      <ChatWidget />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Pti Supermarket</h3>
              <p className="text-primary-foreground/80">
                pti's trusted online marketplace for fresh, authentic groceries.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Button variant="link" className="p-0 h-auto text-primary-foreground/80" onClick={() => navigate("/about")}>About Us</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-primary-foreground/80">Contact</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-primary-foreground/80">FAQ</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Fresh Vegetables</li>
                <li>Tropical Fruits</li>
                <li>Local Rice & Grains</li>
                <li>Traditional Spices</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="text-primary-foreground/80 space-y-2">
                <p>📧 godsen243@gmail.com.com</p>
                <p>📞 +234 816 903 3057</p>
                <p>📍 Delta, Nigeria</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2025 pti Supermarket. Made with ❤️ for Nigeria. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
