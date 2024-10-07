import { Product } from '../entities'

export interface ProductResponse {
	offset: number
	limit: number
	total: number
	totalPage: number
	currentPage: number
	response: Product[]
}
