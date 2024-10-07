export interface IProduct {
  product_id: number;
  product_name: string;
  image_path: string;
  historical_sold: number;
  stock: number;
  price: number;
  discount: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  category: string;
  category_id: number;
  description: string;
}
