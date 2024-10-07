import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { CustomNotFoundException } from "src/common/exceptions/not-found.exception";
import { OperationFailureException } from "src/common/exceptions/operation-failure.exception";
import BaseResponse from "src/common/interfaces/baseResponse";
import {
  Pagination,
  PaginationOptions,
} from "src/common/utils/pagination.util";
import { Like, Repository } from "typeorm";
import { CreateProductDto } from "../dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-product.dto";
import { Product } from "../entities/product.entity";
import { ProductResponse } from "../responses";

export interface IProductService {
  findAll(options: PaginationOptions): Promise<ProductResponse>;
  findOne(product_id: number): Promise<Product>;
  create(createProductDto: CreateProductDto): Promise<BaseResponse>;
  update(
    product_id: number,
    updateProductDto: UpdateProductDto
  ): Promise<BaseResponse>;
  softDelete(product_id: number): Promise<BaseResponse>;
}

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>
  ) {}

  /**
   * @param {CreateProductDto} createProductDto
   * @return { Promise<BaseResponse>}
   */
  public async create(
    createProductDto: CreateProductDto
  ): Promise<BaseResponse> {
    try {
      const item = await this._productRepository.create(createProductDto);
      const newProduct = this._productRepository.save(item);
      if (newProduct) {
        return {
          message: `create new product successfully`,
        };
      } else {
        return {
          message: `create new product failure`,
        };
      }
    } catch (error) {
      throw new OperationFailureException("product", "create");
    }
  }

  /**
   * @param {PaginationOptions} options
   * @return { Promise<ProductResponse>}
   */
  public async findAll(options: PaginationOptions): Promise<ProductResponse> {
    const queryBuilder = this._productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category") // Join with the category table
      .addSelect(["category_name"]);

    // Include soft-deleted records
    // queryBuilder.withDeleted();
    const [result, total] = await Pagination.paginate(queryBuilder, options);
    const transformedResult = result.map((product) =>
      plainToClass(Product, {
        ...product,
        category: product.category.category_name,
      })
    );

    return {
      offset: +options.page * +options.limit,
      limit: +options.limit,
      total: total,
      totalPage: Math.ceil(+total / +options.limit),
      currentPage: +options.page,
      response: transformedResult as Product[],
    };
  }

  /**
   * @param {number} product_id
   * @return { Promise<Product>}
   */
  public async findOne(product_id: number): Promise<Product> {
    const product = await this._productRepository.findOne({
      where: { product_id },
      relations: ["category"],
    });
    if (!product) {
      throw new CustomNotFoundException("product", product_id);
    }
    return plainToClass(Product, {
      ...product,
      category: product.category.category_name,
    });
  }

  /**
   * @param {number} product_id
   * @param {UpdateProductDto} updateProductDto
   * @return { Promise<BaseResponse>}
   */
  public async update(
    product_id: number,
    updateProductDto: UpdateProductDto
  ): Promise<BaseResponse> {
    const product = await this._productRepository.findOneBy({ product_id });
    if (!product) {
      throw new CustomNotFoundException("product", product_id);
    }
    try {
      Object.assign(product, updateProductDto);
      const productUpdated = this._productRepository.save(product);
      if (productUpdated) {
        return {
          message: `update new product successfully`,
        };
      } else {
        return {
          message: `update new product failure`,
        };
      }
    } catch (error) {
      throw new OperationFailureException("product", "update", product_id);
    }
  }

  /**
   * @param {number} product_id
   * @return { Promise<BaseResponse>}
   */
  public async softDelete(product_id: number): Promise<BaseResponse> {
    const product = await this._productRepository.findOneBy({ product_id });
    if (!product) {
      throw new CustomNotFoundException("product", product_id);
    }
    try {
      await this._productRepository.softDelete(product_id);
      return { message: `Product with ID ${product_id} deleted successfully` };
    } catch (error) {
      throw new OperationFailureException("product", "delete", product_id);
    }
  }
}
