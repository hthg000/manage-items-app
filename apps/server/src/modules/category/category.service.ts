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

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new CustomNotFoundException('category', id);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new CustomNotFoundException('category', id);
    }
    try {
      Object.assign(category, updateCategoryDto)
      return this.categoriesRepository.save(category);
    } catch (error) {
      throw new OperationFailureException('category', 'update', id);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new CustomNotFoundException('category', id);
    }
    try {
      await this.categoriesRepository.delete(id);
      return { message: `category with ID ${id} deleted successfully` };
    } catch (error) {
      throw new OperationFailureException('category', 'delete', id);
    }
  }
}
