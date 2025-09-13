// Nigerian food products data with prices in Naira
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  unit: string;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Grains & Rice",
  "Snacks",
  "Beverages",
  "Meat & Fish",
  "Spices",
  "Oil & Cooking",
];

export const products: Product[] = [
  // Vegetables
  {
    id: "1",
    name: "Fresh Tomatoes",
    price: 1500,
    originalPrice: 2000,
    image: "/api/placeholder/300/200",
    category: "Vegetables",
    description: "Fresh, juicy tomatoes perfect for cooking and salads",
    inStock: true,
    unit: "per basket",
    rating: 4.5,
    reviewCount: 128,
    tags: ["fresh", "local", "organic"]
  },
  {
    id: "2",
    name: "Fresh Pepper (Ata Rodo)",
    price: 800,
    originalPrice: 1000,
    image: "/api/placeholder/300/200",
    category: "Vegetables",
    description: "Spicy red peppers for authentic Nigerian dishes",
    inStock: true,
    unit: "per cup",
    rating: 4.3,
    reviewCount: 89,
    tags: ["spicy", "fresh", "local"]
  },
  {
    id: "3",
    name: "Garden Egg",
    price: 1200,
    image: "/api/placeholder/300/200",
    category: "Vegetables",
    description: "Fresh garden eggs, perfect for sauce and stews",
    inStock: true,
    unit: "per pile",
    rating: 4.2,
    reviewCount: 67,
    tags: ["fresh", "nutritious", "local"]
  },
  {
    id: "4",
    name: "Green Vegetables (Ugu)",
    price: 500,
    image: "/api/placeholder/300/200",
    category: "Vegetables",
    description: "Fresh pumpkin leaves for soup and stew",
    inStock: true,
    unit: "per bunch",
    rating: 4.6,
    reviewCount: 145,
    tags: ["leafy", "nutritious", "fresh"]
  },
  
  // Fruits
  {
    id: "5",
    name: "Sweet Oranges",
    price: 2000,
    originalPrice: 2500,
    image: "/api/placeholder/300/200",
    category: "Fruits",
    description: "Sweet and juicy oranges packed with Vitamin C",
    inStock: true,
    unit: "per dozen",
    rating: 4.4,
    reviewCount: 203,
    tags: ["sweet", "citrus", "vitamin-c"]
  },
  {
    id: "6",
    name: "Ripe Bananas",
    price: 1000,
    image: "/api/placeholder/300/200",
    category: "Fruits",
    description: "Sweet ripe bananas perfect for snacking",
    inStock: true,
    unit: "per hand",
    rating: 4.7,
    reviewCount: 312,
    tags: ["sweet", "ripe", "energy"]
  },
  {
    id: "7",
    name: "Watermelon",
    price: 3500,
    image: "/api/placeholder/300/200",
    category: "Fruits",
    description: "Fresh and juicy watermelon, perfect for hot days",
    inStock: true,
    unit: "per piece",
    rating: 4.5,
    reviewCount: 156,
    tags: ["juicy", "refreshing", "large"]
  },
  {
    id: "8",
    name: "Pineapple",
    price: 1500,
    image: "/api/placeholder/300/200",
    category: "Fruits",
    description: "Sweet and tangy pineapple, fully ripe",
    inStock: true,
    unit: "per piece",
    rating: 4.3,
    reviewCount: 98,
    tags: ["sweet", "tropical", "ripe"]
  },

  // Grains & Rice
  {
    id: "9",
    name: "Local Rice (Ofada)",
    price: 8000,
    originalPrice: 9000,
    image: "/api/placeholder/300/200",
    category: "Grains & Rice",
    description: "Premium quality Ofada rice, locally grown",
    inStock: true,
    unit: "per 5kg bag",
    rating: 4.8,
    reviewCount: 267,
    tags: ["local", "premium", "organic"]
  },
  {
    id: "10",
    name: "White Rice",
    price: 6500,
    image: "/api/placeholder/300/200",
    category: "Grains & Rice",
    description: "High quality parboiled white rice",
    inStock: true,
    unit: "per 5kg bag",
    rating: 4.4,
    reviewCount: 189,
    tags: ["parboiled", "quality", "staple"]
  },
  {
    id: "11",
    name: "Beans (Brown)",
    price: 4500,
    image: "/api/placeholder/300/200",
    category: "Grains & Rice",
    description: "Premium brown beans for porridge and stew",
    inStock: true,
    unit: "per 3kg bag",
    rating: 4.6,
    reviewCount: 178,
    tags: ["protein", "brown", "nutritious"]
  },

  // Snacks
  {
    id: "12",
    name: "Plantain Chips",
    price: 1200,
    image: "/api/placeholder/300/200",
    category: "Snacks",
    description: "Crispy plantain chips, locally made",
    inStock: true,
    unit: "per pack",
    rating: 4.2,
    reviewCount: 145,
    tags: ["crispy", "local", "snack"]
  },
  {
    id: "13",
    name: "Groundnuts (Roasted)",
    price: 800,
    image: "/api/placeholder/300/200",
    category: "Snacks",
    description: "Freshly roasted groundnuts",
    inStock: true,
    unit: "per cup",
    rating: 4.5,
    reviewCount: 234,
    tags: ["roasted", "protein", "crunchy"]
  },
  {
    id: "14",
    name: "Coconut Cookies",
    price: 1500,
    image: "/api/placeholder/300/200",
    category: "Snacks",
    description: "Homemade coconut cookies",
    inStock: true,
    unit: "per pack",
    rating: 4.3,
    reviewCount: 87,
    tags: ["homemade", "coconut", "sweet"]
  },

  // Beverages
  {
    id: "15",
    name: "Fresh Zobo Drink",
    price: 500,
    image: "/api/placeholder/300/200",
    category: "Beverages",
    description: "Refreshing zobo drink with natural spices",
    inStock: true,
    unit: "per bottle",
    rating: 4.4,
    reviewCount: 156,
    tags: ["refreshing", "natural", "spiced"]
  },
  {
    id: "16",
    name: "Palm Wine",
    price: 800,
    image: "/api/placeholder/300/200",
    category: "Beverages",
    description: "Fresh palm wine, traditionally tapped",
    inStock: true,
    unit: "per bottle",
    rating: 4.1,
    reviewCount: 92,
    tags: ["traditional", "fresh", "local"]
  },
  {
    id: "17",
    name: "Pure Water",
    price: 300,
    image: "/api/placeholder/300/200",
    category: "Beverages",
    description: "Clean drinking water in sachets",
    inStock: true,
    unit: "per bag (20 sachets)",
    rating: 4.0,
    reviewCount: 445,
    tags: ["clean", "pure", "essential"]
  },

  // Meat & Fish
  {
    id: "18",
    name: "Fresh Chicken",
    price: 4500,
    image: "/api/placeholder/300/200",
    category: "Meat & Fish",
    description: "Fresh locally raised chicken",
    inStock: true,
    unit: "per kg",
    rating: 4.6,
    reviewCount: 198,
    tags: ["fresh", "local", "protein"]
  },
  {
    id: "19",
    name: "Catfish (Fresh)",
    price: 3500,
    image: "/api/placeholder/300/200",
    category: "Meat & Fish",
    description: "Fresh catfish from local farms",
    inStock: true,
    unit: "per kg",
    rating: 4.5,
    reviewCount: 167,
    tags: ["fresh", "farm", "fish"]
  },

  // Spices
  {
    id: "20",
    name: "Curry Powder",
    price: 600,
    image: "/api/placeholder/300/200",
    category: "Spices",
    description: "Aromatic curry powder for seasoning",
    inStock: true,
    unit: "per pack",
    rating: 4.3,
    reviewCount: 134,
    tags: ["aromatic", "seasoning", "spice"]
  },
  {
    id: "21",
    name: "Maggi Cubes",
    price: 400,
    image: "/api/placeholder/300/200",
    category: "Spices",
    description: "Maggi seasoning cubes for cooking",
    inStock: true,
    unit: "per pack",
    rating: 4.7,
    reviewCount: 389,
    tags: ["seasoning", "cooking", "flavor"]
  },

  // Oil & Cooking
  {
    id: "22",
    name: "Palm Oil (Red Oil)",
    price: 2500,
    image: "/api/placeholder/300/200",
    category: "Oil & Cooking",
    description: "Pure red palm oil for cooking",
    inStock: true,
    unit: "per bottle (1 liter)",
    rating: 4.5,
    reviewCount: 223,
    tags: ["pure", "cooking", "traditional"]
  },
  {
    id: "23",
    name: "Groundnut Oil",
    price: 3000,
    image: "/api/placeholder/300/200",
    category: "Oil & Cooking",
    description: "Pure groundnut oil for cooking and frying",
    inStock: true,
    unit: "per bottle (1 liter)",
    rating: 4.4,
    reviewCount: 187,
    tags: ["pure", "frying", "cooking"]
  },
  {
    id: "24",
    name: "Salt",
    price: 200,
    image: "/api/placeholder/300/200",
    category: "Oil & Cooking",
    description: "Pure table salt for cooking",
    inStock: true,
    unit: "per pack",
    rating: 4.2,
    reviewCount: 298,
    tags: ["pure", "essential", "cooking"]
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All") {
    return products;
  }
  return products.filter(product => product.category === category);
};

// Helper function to search products
export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) {
    return products;
  }
  
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};