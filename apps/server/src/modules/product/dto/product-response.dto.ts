export class ProductResponseDto {
    product_id: number;
    product_name: string;
    description?: string;
    price: number;
    category: string;
    image_path?: string;
}
