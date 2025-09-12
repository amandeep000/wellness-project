interface OrderItem {
  productName: string;
  productPrice: number;
  productQuantity: number;
}

interface Order {
  _id: string;
  createdAt: string;
  orderStatus: string;
  orderItems: OrderItem[];
}

export default Order;
