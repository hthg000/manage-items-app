import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { productReducer, ProductState } from 'modules/product/store/reducers'

export interface AppState {
	feature_product: ProductState
}

@NgModule({
	imports: [
    StoreModule.forFeature('product', productReducer
    ),
  ]
})
export class StoreClientModule {}
