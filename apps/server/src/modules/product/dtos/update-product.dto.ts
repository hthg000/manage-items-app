import { IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class UpdateProductDto {
	@IsOptional()
	@IsString()
	product_name?: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	// @IsNumber()
	category_id?: number

	@IsOptional()
	// @IsNumber()
	// @Min(0)
	price?: number

	@IsNumber()
	@Min(0)
	historical_sold: number

	@IsNumber()
	@Min(0)
	stock: number

	@IsNumber()
	@Min(0)
	discount: string

	@IsOptional()
	@IsString()
	image_path?: string
}
