import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	ParseFilePipeBuilder,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { PaginationDto } from 'src/common/dtos/pagination.dto'
import BaseResponse from 'src/common/interfaces/baseResponse'
import { CustomParseFloatPipe } from 'src/common/pipes/parse-float.pipe'
import { fileUploadInterceptor } from 'src/common/utils/file-upload.utils'
import { buildPaginationOptions } from 'src/common/utils/pagination.util'
import { CreateProductDto } from '../dtos/create-product.dto'
import { UpdateProductDto } from '../dtos/update-product.dto'
import { Product } from '../entities'
import { ProductResponse } from '../responses'
import { ProductService } from '../services/product.service'

@Controller('products')
export class ProductController {
	constructor(private readonly _productService: ProductService) { }

	@Post()
	@UseInterceptors(fileUploadInterceptor())
	// @UsePipes(new PriceValidationPipe())
	public async create(
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ })
				.addMaxSizeValidator({ maxSize: 1 * 1024 * 1024 })
				.build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
		)
		file: Express.Multer.File,
		@Body('price', CustomParseFloatPipe) price: number,
		@Body() createProductDto: CreateProductDto
	): Promise<BaseResponse> {
		createProductDto.price = price
		createProductDto.image_path = file ? `/uploads/${file.filename}` : null

		return this._productService.create(createProductDto)
	}

	@Get()
	public async findAll(@Query() paginationDto: PaginationDto): Promise<ProductResponse> {
		const options = buildPaginationOptions(paginationDto)
		return this._productService.findAll(options)
	}

	@Get(':id')
	public async findOne(@Param('id') id: string): Promise<Product> {
		return this._productService.findOne(+id)
	}

	@Patch(':id')
	@UseInterceptors(fileUploadInterceptor())
	public async update(
		@Param('id') id: string,
		@UploadedFile() file: Express.Multer.File,
		@Body() updateProductDto: UpdateProductDto,
		@Body('price', CustomParseFloatPipe) price?: number
	): Promise<BaseResponse> {
		if (price !== undefined) {
			// Only update if price provided
			updateProductDto.price = price
		}
		if (file) {
			updateProductDto.image_path = `/uploads/${file.filename}`
		}
		return this._productService.update(+id, updateProductDto)
	}

	@Delete(':id')
	public async remove(@Param('id') id: string): Promise<BaseResponse> {
		return this._productService.softDelete(+id)
	}
}
