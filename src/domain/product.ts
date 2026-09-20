export type Product = {
  id: string;
  title: string;
  image: string;
  description: string;
  /** Price in minor units (cents), e.g. 8999 = $89.99. */
  priceInCents: number;
  stockQuantity: number;
  categoryId: string;
};
