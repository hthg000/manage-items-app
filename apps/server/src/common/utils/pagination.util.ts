import { SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../dtos/pagination.dto';

export class PaginationOptions {
  page: string;
  limit: string;
  sort?: string;
  filter?: string;
}

export function buildPaginationOptions(paginationDto: PaginationDto): PaginationOptions {
  return {
    page: paginationDto.page,
    limit: paginationDto.limit,
    sort: paginationDto.sort,
    filter: paginationDto.filter,
  };
}

export class Pagination {
  static paginate<T>(queryBuilder: SelectQueryBuilder<T>, options: PaginationOptions) {
    const { page, limit, sort, filter } = options;

    // Convert page and limit to integers
    const pageNumber = parseInt(page as unknown as string, 10);
    const limitNumber = parseInt(limit as unknown as string, 10);

    if (filter) {
      queryBuilder.where('entity.someField LIKE :filter', { filter: `%${filter}%` });
    }

    if (sort) {
      queryBuilder.orderBy(`entity.${sort}`);
    }

    queryBuilder.skip((pageNumber - 1) * limitNumber).take(limitNumber);

    return queryBuilder.getManyAndCount();
  }
}
