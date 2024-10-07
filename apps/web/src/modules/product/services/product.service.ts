import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment.dev'
import { Store } from '@ngrx/store'
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs'
import CreateProductDto from '../dtos/createProduct.dto'
import ProductDto from '../dtos/product.dto'
import UpdateProductDto from '../dtos/updateProduct.dto'
import { ProductResponse } from '../interfaces/product.response'
import { IProduct } from '../models'
import { getAllProductSuccess } from '../store/actions'
export interface BasePostResponse {
	err: number
	msg: string
}
@Injectable({
	providedIn: 'root'
})
export class ProductService {
	public total$ = new BehaviorSubject<number>(1)
	private _enPoint = environment.BASE_URL

	constructor(
		private readonly _httpClient: HttpClient,
		private readonly _store: Store,
	) {}

  /**
	 * @param {ProductDto} query
	 * @return {Observable<IProduct[]>}
	 */
	public getProducts(query: ProductDto): Observable<IProduct[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
			params: new HttpParams().set('page', query.page).set('limit', query.limit)
		}

		return this._httpClient.get<ProductResponse>(`${this._enPoint}/products`, httpOptions).pipe(
			tap((res: ProductResponse) => {
				return this.total$.next(res.total)
			}),
			map((res: ProductResponse) => {
				this._store.dispatch(getAllProductSuccess({ products: res.response }))
				return res.response
			}),
			catchError((error) => {
				return throwError(() => new Error('Failed to fetch products. Please try again later.'))
			})
		)
	}

  /**
	 * @param {string} id
	 * @param {payload} CreateProductDto
	 * @return {Observable<BasePostResponse>}
	 */
	public creatProducts(payload: CreateProductDto): Observable<BasePostResponse> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		}

		return this._httpClient.patch<BasePostResponse>(`${this._enPoint}/products`,payload, httpOptions).pipe(
			map((res) => res),
			catchError((error) => {
				return throwError(() => new Error('Failed to create products. Please try again later.'))
			})
		)
	}

	/**
	 * @param {string} id
	 * @param {payload} UpdateProductDto
	 * @return {Observable<BasePostResponse>}
	 */
	public editProducts(id: number, payload: UpdateProductDto): Observable<BasePostResponse> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		}

		return this._httpClient.patch<BasePostResponse>(`${this._enPoint}/products/${id}`,payload, httpOptions).pipe(
			map((res) => res),
			catchError((error) => {
				return throwError(() => new Error('Failed to edit products. Please try again later.'))
			})
		)
	}

	/**
	 * @param {string} id
	 * @return {Observable<BasePostResponse>}
	 */
	public deleteProducts(id: number): Observable<BasePostResponse> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		}

		return this._httpClient.delete<BasePostResponse>(`${this._enPoint}/products/${id}`, httpOptions).pipe(
			map((res) => res),
			catchError((error) => {
				return throwError(() => new Error('Failed to fetch products. Please try again later.'))
			})
		)
	}
}
