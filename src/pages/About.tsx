import { ArrowLeft, Users, Truck, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "Community First",
      description: "We connect you directly with local farmers and suppliers, supporting Nigerian communities and ensuring the freshest products reach your table."
    },
    {
      icon: <Truck className="h-12 w-12 text-primary" />,
      title: "Fast Delivery",
      description: "Free delivery on orders above ₦5,000 across Lagos and major Nigerian cities. Get your fresh groceries delivered to your doorstep within hours."
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Quality Guarantee",
      description: "Every product is carefully selected and inspected for quality. We guarantee fresh, authentic Nigerian products or your money back."
    },
    {
      icon: <Heart className="h-12 w-12 text-primary" />,
      title: "Made with Love",
      description: "From our family to yours, we're passionate about bringing the best of Nigerian agriculture and cuisine to your home."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Fresh Products" },
    { number: "20+", label: "Nigerian States" },
    { number: "99%", label: "Customer Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="text-2xl font-bold text-primary">NaijaKart</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-primary">NaijaKart</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Nigeria's premier online marketplace for fresh, authentic, and quality groceries. 
            We're on a mission to connect every Nigerian home with the finest local produce and ingredients.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">From Market to Your Doorstep</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 2024, NaijaKart was born from a simple observation: Nigerians deserve easy access to 
                  fresh, quality groceries without compromising on authenticity or breaking the bank.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We started by partnering with local farmers and suppliers across Nigeria, ensuring that every 
                  tomato, pepper, rice grain, and spice meets our high standards for freshness and quality.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we serve thousands of families across Nigeria, delivering everything from fresh vegetables 
                  and fruits to traditional spices and cooking essentials.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-8 rounded-lg">
                <h4 className="text-xl font-semibold mb-4 text-primary">Our Mission</h4>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "To make fresh, authentic Nigerian groceries accessible to every home, while supporting 
                  local farmers and promoting sustainable agriculture across Nigeria."
                </p>
                
                <h4 className="text-xl font-semibold mb-4 text-primary">Our Vision</h4>
                <p className="text-muted-foreground leading-relaxed">
                  "To become Nigeria's most trusted online grocery platform, celebrating our rich culinary 
                  heritage while embracing modern convenience."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose NaijaKart?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">NaijaKart by Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Authenticity</h3>
                <p className="text-muted-foreground">
                  We celebrate genuine Nigerian flavors and traditional ingredients, 
                  sourced directly from local farms and markets.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Sustainability</h3>
                <p className="text-muted-foreground">
                  We support eco-friendly farming practices and sustainable packaging 
                  to protect our environment for future generations.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Community</h3>
                <p className="text-muted-foreground">
                  We believe in empowering local communities, supporting small-scale 
                  farmers, and building lasting relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you!
          </p>
          
          <div className="space-y-4 max-w-md mx-auto">
            <div className="text-muted-foreground">
              <strong>Email:</strong> hello@naija-kart.com
            </div>
            <div className="text-muted-foreground">
              <strong>Phone:</strong> +234 123 456 7890
            </div>
            <div className="text-muted-foreground">
              <strong>Address:</strong> Lagos, Nigeria
            </div>
          </div>
          
          <div className="mt-8">
            <Button onClick={() => navigate("/")} size="lg">
              Start Shopping
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">NaijaKart</div>
          <p className="text-primary-foreground/80">
            © 2024 NaijaKart. Made with ❤️ for Nigeria.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;