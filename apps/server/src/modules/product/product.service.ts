import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CustomNotFoundException } from 'src/common/exceptions/not-found.exception';
import { OperationFailureException } from 'src/common/exceptions/operation-failure.exception';
import { Pagination, PaginationOptions } from 'src/common/utils/pagination.util';

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

  async findAll(options: PaginationOptions): Promise<{ data: Product[]; total: number }> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    // Include soft-deleted records
    // queryBuilder.withDeleted();

    const [result, total] = await Pagination.paginate(queryBuilder, options);
    return { data: result, total };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new CustomNotFoundException('product', id);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new CustomNotFoundException('product', id);
    }
    try {
      Object.assign(product, updateProductDto)
      return this.productRepository.save(product);
    } catch (error) {
      throw new OperationFailureException('product', 'update', id);
    }
  }

  async softDelete(id: number): Promise<{ message: string }> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new CustomNotFoundException('product', id);
    }
    try {
      await this.productRepository.softDelete(id);
      return { message: `Product with ID ${id} deleted successfully` };
    } catch (error) {
      throw new OperationFailureException('product', 'delete', id);
    }
  }
}
