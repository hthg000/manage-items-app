import { IProduct } from "../models"

export interface ProductResponse {
	err: number
	msg: string
	total: number
	totalPage: number
	currentPage: number
	offset: number
	limit: number
	response: IProduct[]
}
