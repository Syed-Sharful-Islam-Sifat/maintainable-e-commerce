export type Payment = {
  id: string;
  orderId: string;
  userId: string;
  paidAmountInCents: number;
  paymentIntentId: string;
  paymentMethod: string;
  createdAt: Date;
};
