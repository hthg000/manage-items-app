import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ProductState } from '../reducers'

const featureProduct = createFeatureSelector<ProductState>('product')

export const productSelector = createSelector(featureProduct, (state) => {
	return state.items
})
