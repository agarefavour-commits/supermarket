import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/components/Cart/CartSidebar";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  landmark: string;
}

const CheckoutModal = ({ isOpen, onClose, cartItems, onOrderSuccess }: CheckoutModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Shipping information
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("card");

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 5000 ? 0 : 1000;
  const total = subtotal + deliveryFee;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['fullName', 'phone', 'email', 'address', 'city', 'state'];
    const missingFields = requiredFields.filter(field => 
      !shippingInfo[field as keyof ShippingInfo].trim()
    );

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setCurrentStep(2);
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate Paystack payment integration
      // In real implementation, you would integrate with Paystack API
      
      // Generate a dummy reference for the payment
      const paymentReference = `NJ_${Date.now()}`;
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock successful payment response
      const paymentResult = {
        success: true,
        reference: paymentReference,
        amount: total,
        currency: "NGN",
      };

      if (paymentResult.success) {
        // Store order in localStorage (replace with actual API call)
        const order = {
          id: paymentReference,
          items: cartItems,
          shippingInfo,
          paymentMethod,
          subtotal,
          deliveryFee,
          total,
          status: "confirmed",
          createdAt: new Date().toISOString(),
        };

        const existingOrders = JSON.parse(localStorage.getItem("naija_kart_orders") || "[]");
        existingOrders.push(order);
        localStorage.setItem("naija_kart_orders", JSON.stringify(existingOrders));

        toast({
          title: "Order Placed Successfully! 🎉",
          description: `Your order #${paymentReference} has been confirmed. We'll start preparing your items right away!`,
        });

        onOrderSuccess();
        onClose();
        setCurrentStep(1);
        
        // Reset form
        setShippingInfo({
          fullName: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          state: "",
          landmark: "",
        });
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {currentStep === 1 ? "Shipping Information" : "Payment"}
          </DialogTitle>
        </DialogHeader>

        {currentStep === 1 ? (
          // Step 1: Shipping Information
          <form onSubmit={handleShippingSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="e.g., 08012345678"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={shippingInfo.email}
                onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Textarea
                id="address"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter your complete address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="e.g., Lagos"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={shippingInfo.state}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="e.g., Lagos State"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="landmark">Nearest Landmark (Optional)</Label>
              <Input
                id="landmark"
                value={shippingInfo.landmark}
                onChange={(e) => setShippingInfo(prev => ({ ...prev, landmark: e.target.value }))}
                placeholder="e.g., Close to Shoprite Mall"
              />
            </div>

            <div className="flex space-x-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Continue to Payment
              </Button>
            </div>
          </form>
        ) : (
          // Step 2: Payment
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-semibold">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Debit/Credit Card (Paystack)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer">Bank Transfer (Paystack)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ussd" id="ussd" />
                  <Label htmlFor="ussd">USSD (Paystack)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Delivery Information */}
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Delivery Information</h3>
              <div className="text-sm text-muted-foreground">
                <p><strong>Name:</strong> {shippingInfo.fullName}</p>
                <p><strong>Phone:</strong> {shippingInfo.phone}</p>
                <p><strong>Address:</strong> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}</p>
                {shippingInfo.landmark && <p><strong>Landmark:</strong> {shippingInfo.landmark}</p>}
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-sm"
                onClick={() => setCurrentStep(1)}
              >
                Edit delivery information
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setCurrentStep(1)} 
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handlePayment} 
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? "Processing Payment..." : `Pay ${formatPrice(total)}`}
              </Button>
            </div>

            {/* Payment Security Note */}
            <div className="text-xs text-muted-foreground text-center">
              🔒 Your payment is secured by Paystack. We do not store your card details.
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;