import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationFailureException } from 'src/common/exceptions/operation-failure.exception';
import { CustomNotFoundException } from 'src/common/exceptions/not-found.exception';
import { Pagination, PaginationOptions } from 'src/common/utils/pagination.util';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) { }

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const item = this.categoriesRepository.create(createCategoryDto);
      return this.categoriesRepository.save(item);
    } catch (error) {
      throw new OperationFailureException('category', 'create');
    }
  }

  async findAll(options: PaginationOptions): Promise<{ data: Category[]; total: number }> {
    const queryBuilder = this.categoriesRepository.createQueryBuilder('entity');
    const [result, total] = await Pagination.paginate(queryBuilder, options);
    return { data: result, total };
  }

  async findOne(category_id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ category_id });
    if (!category) {
      throw new CustomNotFoundException('category', category_id);
    }
    return category;
  }

  async update(category_id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ category_id });
    if (!category) {
      throw new CustomNotFoundException('category', category_id);
    }
    try {
      Object.assign(category, updateCategoryDto)
      return this.categoriesRepository.save(category);
    } catch (error) {
      throw new OperationFailureException('category', 'update', category_id);
    }
  }

  async remove(category_id: number): Promise<{ message: string }> {
    const category = await this.categoriesRepository.findOneBy({ category_id });
    if (!category) {
      throw new CustomNotFoundException('category', category_id);
    }
    try {
      await this.categoriesRepository.delete(category_id);
      return { message: `category with ID ${category_id} deleted successfully` };
    } catch (error) {
      throw new OperationFailureException('category', 'delete', category_id);
    }
  }
}
