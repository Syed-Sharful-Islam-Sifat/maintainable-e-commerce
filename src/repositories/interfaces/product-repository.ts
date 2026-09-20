import type { Product } from "@/domain/product";

export type ProductFilter = {
  categoryId?: string;
};
export interface ProductRepository {
  getList(filter?: ProductFilter): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}
