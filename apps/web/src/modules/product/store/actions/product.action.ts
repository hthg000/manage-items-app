import { ActionType, createAction, props } from '@ngrx/store'
import { IProduct } from 'modules/product/models'

export const GET_PRODUCTS = '@Product/GetAll'
export const GET_PRODUCTS_SUCCESS = '@Product/GetAllSuccess'
export const GET_PRODUCTS_FAILED = '@Product/GetAllFailed'

export const getAllProduct = createAction(GET_PRODUCTS)
export const getAllProductSuccess = createAction(GET_PRODUCTS_SUCCESS, props<{ products: IProduct[] }>())
export const getAllProductFailed = createAction(GET_PRODUCTS_FAILED, props<{ error?: string }>())

export type ProductActions =
	| ActionType<typeof getAllProduct>
	| ActionType<typeof getAllProductSuccess>
	| ActionType<typeof getAllProductFailed>
