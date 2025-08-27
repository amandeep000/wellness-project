// types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  stock?: number;
  bgColor?: string;
  images: string[];
  tags: string[];

  // Category information
  category: {
    id: string;
    name: string;
    slug: string;
    image?: string;
  };

  // Supplements-specific fields
  ingredients: string[];
  ingredientsDescription: string[];
  ingredientsVideo: string;
  benefits: string[];
  supplementGuide: string[];

  // Mission/brand information
  missionText: string;
  missionImage: string;

  // Review information
  reviews: {
    averageRating?: number;
    totalReviews?: number;
    recentReviews?: Review[];
  };

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  rating?: number;
  comment: string;
  image: string;
  user: {
    name: string;
    avatar: string;
  };
  createdAt?: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  message: string;
}

export interface SingleProductResponse {
  success: boolean;
  data: Product;
  message: string;
}
