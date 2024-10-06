import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CustomNotFoundException } from 'src/common/exceptions/not-found.exception';
import { OperationFailureException } from 'src/common/exceptions/operation-failure.exception';
import { Pagination, PaginationOptions } from 'src/common/utils/pagination.util';
import { ProductResponseDto } from './dto/product-response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const item = this.productRepository.create(createProductDto);
      return this.productRepository.save(item);
    } catch (error) {
      throw new OperationFailureException('product', 'create');
    }
  }

  async findAll(options: PaginationOptions): Promise<{ data: ProductResponseDto[]; total: number }> {
    const queryBuilder = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category') // Join with the category table
      .addSelect(['category_name']);

    // Include soft-deleted records
    // queryBuilder.withDeleted();

    const [result, total] = await Pagination.paginate(queryBuilder, options);
    const transformedResult = result.map(product => plainToClass(ProductResponseDto, {
      ...product,
      category: product.category.category_name,
    }));

    return { data: transformedResult, total };
  }

  async findOne(product_id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({ where: { product_id }, relations: ['category'] });
    if (!product) {
      throw new CustomNotFoundException('product', product_id);
    }
    return plainToClass(ProductResponseDto, {
      ...product,
      category: product.category.category_name,
    });
  }

  async update(product_id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ product_id });
    if (!product) {
      throw new CustomNotFoundException('product', product_id);
    }
    try {
      Object.assign(product, updateProductDto)
      return this.productRepository.save(product);
    } catch (error) {
      throw new OperationFailureException('product', 'update', product_id);
    }
  }

  async softDelete(product_id: number): Promise<{ message: string }> {
    const product = await this.productRepository.findOneBy({ product_id });
    if (!product) {
      throw new CustomNotFoundException('product', product_id);
    }
    try {
      await this.productRepository.softDelete(product_id);
      return { message: `Product with ID ${product_id} deleted successfully` };
    } catch (error) {
      throw new OperationFailureException('product', 'delete', product_id);
    }
  }
}
