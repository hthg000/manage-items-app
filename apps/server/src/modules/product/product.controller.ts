import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, Query, UsePipes } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { buildPaginationOptions } from 'src/common/utils/pagination.util';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CustomParseFloatPipe } from 'src/common/pipes/parse-float.pipe';
import { fileUploadInterceptor } from 'src/common/utils/file-upload.utils';
import { PriceValidationPipe } from 'src/common/pipes/price_validation.pipe';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseInterceptors(fileUploadInterceptor())
  // @UsePipes(new PriceValidationPipe())
  async create(
    @UploadedFile(new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/, })
      .addMaxSizeValidator({ maxSize: 1 * 1024 * 1024 })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) file: Express.Multer.File,
    @Body('price', CustomParseFloatPipe) price: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    createProductDto.price = price;
    createProductDto.image_path = file ? `/uploads/${file.filename}` : null;
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const options = buildPaginationOptions(paginationDto);
    return this.productService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(fileUploadInterceptor())
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto,
    @Body('price', CustomParseFloatPipe) price?: number,
  ) {
    if (price !== undefined) { // Only update if price provided
      updateProductDto.price = price;
    }
    if (file) {
      updateProductDto.image_path = `/uploads/${file.filename}`
    }
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.softDelete(+id);
  }
}
