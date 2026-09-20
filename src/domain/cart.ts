export type CartOwner =
  { type: "user"; userId: string } | { type: "guest"; guestId: string };

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
};

export type Cart = {
  id: string;
  owner: CartOwner;
  items: CartItem[];
  updatedAt: Date;
};
