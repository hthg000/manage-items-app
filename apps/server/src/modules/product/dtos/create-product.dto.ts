import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    product_name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    // @IsNumber()
    category_id: number;

    @IsNotEmpty()
    // @IsNumber()
    // @Min(0)
    price: number;

    @IsNotEmpty()
    historical_sold: number;

    @IsNotEmpty()
    stock: number;

    @IsNotEmpty()
    discount: string;


    @IsOptional()
    @IsString()
    image_path?: string;
}
