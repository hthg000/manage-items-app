import { IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    product_name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    // @IsNumber()
    category_id?: number;

    @IsOptional()
    // @IsNumber()
    // @Min(0)
    price?: number;

    @IsOptional()
    @IsString()
    image_path?: string;
}
