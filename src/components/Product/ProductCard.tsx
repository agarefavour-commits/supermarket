import { useState } from "react";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onViewProduct }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      onAddToCart(product);
      toast({
        title: "Added to Cart!",
        description: `${product.name} has been added to your cart.`,
      });
      setIsLoading(false);
    }, 500);
  };

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20">
      <CardContent className="p-4">
        {/* Product Image */}
        <div className="relative mb-3">
          <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute top-2 left-2 text-xs font-semibold"
            >
              -{discountPercentage}%
            </Badge>
          )}

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}

          {/* Quick View Button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onViewProduct(product)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Category */}
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>

          {/* Product Name */}
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {product.name}
          </h3>

          {/* Unit */}
          <p className="text-xs text-muted-foreground">{product.unit}</p>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock || isLoading}
          className="w-full"
          size="sm"
        >
          {isLoading ? (
            "Adding..."
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;