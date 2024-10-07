import { createReducer, on } from '@ngrx/store'
import { IProduct } from '../../models/product.model'
import * as ProductActions from '../actions'

export interface ProductState {
	items: IProduct[]
	success: boolean
	error: boolean | string
}

const initialState: ProductState = {
	items: [],
	success: false,
	error: false
}

export const productReducer = createReducer(
	initialState,

	on(ProductActions.getAllProduct, (state: ProductState) => ({
		...state
	})),

	on(ProductActions.getAllProductSuccess, (state: ProductState, action: any) => ({
		success: true,
		items: action,
		error: false
	})),

	on(ProductActions.getAllProductFailed, (state: ProductState, action: any) => ({
		...state,
		success: false,
		error: action.error
	}))
)
