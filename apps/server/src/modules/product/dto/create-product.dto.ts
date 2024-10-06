import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

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

    @IsOptional()
    @IsString()
    image_path?: string;
}
