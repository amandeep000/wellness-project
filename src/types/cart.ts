// types/cart.ts
export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  stock?: number;
  image: string;
  bgColor?: string;
}

export interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  totalItems: number;
  totalAmount: number;
}
