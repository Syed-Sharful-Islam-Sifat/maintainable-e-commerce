export type OrderStatus = "PENDING_PAYMENT" | "CONFIRMED" | "CANCELLED";

export type ShippingAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  /** Unit price frozen at checkout; never read from the live product. */
  priceAtPurchaseInCents: number;
};

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  totalInCents: number;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  createdAt: Date;
};
