export default interface CreateProductDto {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  category_id: number;
  category: any;
  image_path: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};
