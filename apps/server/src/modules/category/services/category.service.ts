import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomNotFoundException } from "src/common/exceptions/not-found.exception";
import { OperationFailureException } from "src/common/exceptions/operation-failure.exception";
import BaseResponse from "src/common/interfaces/baseResponse";
import {
  Pagination,
  PaginationOptions,
} from "src/common/utils/pagination.util";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { UpdateCategoryDto } from "../dtos/update-category.dto";
import { Category } from "../entities/category.entity";

export interface ICategoryService {
  findAll(
    options: PaginationOptions
  ): Promise<{ data: Category[]; total: number }>;
  findOne(category_id: number): Promise<Category>;
  create(createCategoryDto: CreateCategoryDto): Promise<BaseResponse>;
  update(
    category_id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<BaseResponse>;
  remove(category_id: number): Promise<BaseResponse>;
}

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectRepository(Category)
    private _categoriesRepository: Repository<Category>
  ) {}

  /**
   * @param {PaginationOptions} options
   * @return { { data: Category[]; total: number }}
   */
  public async findAll(
    options: PaginationOptions
  ): Promise<{ data: Category[]; total: number }> {
    const queryBuilder =
      this._categoriesRepository.createQueryBuilder("entity");
    const [result, total] = await Pagination.paginate(queryBuilder, options);
    return { data: result, total };
  }

  /**
   * @param {Categnumberory} category_id
   * @return { Promise<Category>}
   */
  public async findOne(category_id: number): Promise<Category> {
    const category = await this._categoriesRepository.findOneBy({
      category_id,
    });
    if (!category) {
      throw new CustomNotFoundException("category", category_id);
    }
    return category;
  }

  /**
   * @param {CreateCategoryDto} createCategoryDto
   * @return { Promise<BaseResponse>}
   */
  public async create(
    createCategoryDto: CreateCategoryDto
  ): Promise<BaseResponse> {
    try {
      const item = await this._categoriesRepository.create(createCategoryDto);
      const newCategory = this._categoriesRepository.save(item);
      if (newCategory) {
        return {
          message: `create new category successfully`,
        };
      } else {
        return {
          message: `create new category failure`,
        };
      }
    } catch (error) {
      throw new OperationFailureException("category", "create");
    }
  }

  /**
   * @param {number} category_id
   * @param {UpdateCategoryDto} updateCategoryDto
   * @return { Promise<BaseResponse>}
   */
  public async update(
    category_id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<BaseResponse> {
    const category = await this._categoriesRepository.findOneBy({
      category_id,
    });
    if (!category) {
      throw new CustomNotFoundException("category", category_id);
    }
    try {
      Object.assign(category, updateCategoryDto);
      const categoryUpdated = this._categoriesRepository.save(category);
      if (categoryUpdated) {
        return {
          message: `update category successfully`,
        };
      } else {
        return {
          message: `update category failure`,
        };
      }
    } catch (error) {
      throw new OperationFailureException("category", "update", category_id);
    }
  }

  /**
   * @param {number} category_id
   * @return { Promise<BaseResponse>}
   */
  public async remove(category_id: number): Promise<BaseResponse> {
    const category = await this._categoriesRepository.findOneBy({
      category_id,
    });
    if (!category) {
      throw new CustomNotFoundException("category", category_id);
    }
    try {
      await this._categoriesRepository.delete(category_id);
      return {
        message: `category with ID ${category_id} deleted successfully`,
      };
    } catch (error) {
      throw new OperationFailureException("category", "delete", category_id);
    }
  }
}
