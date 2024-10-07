import { SelectQueryBuilder } from 'typeorm'
import { PaginationDto } from '../dtos/pagination.dto'

export class PaginationOptions {
	page: string
	limit: string
	sort?: string
	search?: string
}

export function buildPaginationOptions(paginationDto: PaginationDto): PaginationOptions {
	return {
		page: paginationDto.page,
		limit: paginationDto.limit,
		sort: paginationDto.sort,
		search: paginationDto.search
	}
}

export class Pagination {
	static paginate<T>(queryBuilder: SelectQueryBuilder<T>, options: PaginationOptions) {
		const { page, limit, sort, search } = options

		// Convert page and limit to integers
		const pageNumber = parseInt(page as unknown as string, 10)
		const limitNumber = parseInt(limit as unknown as string, 10)

		if (search) {
			queryBuilder.where('product.product_name LIKE :search', { search: `%${search}%` })
		}

		if (sort) {
			const sortDirection = sort ? 'ASC' : 'DESC';
			queryBuilder.orderBy(`product.product_name`, sortDirection);
		}

		queryBuilder.skip((pageNumber - 1) * limitNumber).take(limitNumber)

		return queryBuilder.getManyAndCount()
	}
}
