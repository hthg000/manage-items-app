import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ConfirmComponent } from '@core/libs';
import { environment } from '@environments/environment.dev';
import { finalize, Observable, of } from 'rxjs';
import ProductDto from '../dtos/product.dto';
import { IProduct } from '../models';
import { ProductService } from '../services';
import { ProductPopupComponent } from './product-popup.component';

export type Sort = 'ASC' | 'DESC' | '';
@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: '../templates/product-list.component.html',
  styleUrls: ['../styles/product-list.component.scss'],
  providers: [ProductService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductPopupComponent,
    ConfirmComponent,
    MatProgressBarModule,
    MatTooltipModule,
    MatIconButton,
    MatIconAnchor,
    MatMenuModule,
    MatButtonModule,
    ConfirmComponent,
    MatPaginatorModule,
  ],
})
export class ProductListComponent {
  @ViewChild('Confirm') confirm!: ConfirmComponent;
  protected baseEnv = environment.BASE_URL
  protected showProgressBar: boolean = false;
  protected totalItems: number = 0;
  protected checked: boolean = true;
  protected dataSources$!: Observable<IProduct[]>;
  protected readonly PAGE_OPTIONS: number[] = [5, 10, 25, 100];
  protected PAGE_SIZE = 0;

  protected productDto: ProductDto = {
    page: 1,
    limit: this.PAGE_OPTIONS[2],
  };

  constructor(private readonly _productService: ProductService) {
    console.log(this.baseEnv,"baseEnv")
    this.PAGE_SIZE = this.PAGE_OPTIONS[2];
  }

  ngOnInit(): void {
    this._fetchProducts();
  }

  /**
   * @param {string} number
   * @param {ActionsProduct} action
   * @param {any} event
   * @return {void}
   */
  protected onSort(event: any, sort?: Sort) {
    //   const eventKey = event as keyof ProductDto;
    //   this.productDto[eventKey] = sort;
  }

  /**
   * @return {void}
   */
  protected onTypingSearch(event: any): void {
    // const inputElement = event.target as HTMLInputElement;
    // this.productDto.name = inputElement.value;
  }

  /**
   * @return {void}
   */
  protected onSearch(): void {
    this._fetchProducts();
  }

  /**
   * @param {PageEvent} event
   * @return {void}
   */
  protected onChangePage(event: PageEvent): void {
    console.log(event, 'event');
    this.productDto.limit = event.pageSize;
    this.productDto.page = event.pageIndex + 1;
    this.PAGE_SIZE = event.pageSize;
    this._fetchProducts();
  }

  /**
   * @param {number} id
   * @return {void}
   */
  protected onEditProduct(id: number): void {}

  /**
   * @param {number} id
   * @return {void}
   */
  protected onRemoveProduct(id: number): void {
    this.confirm.isShow = true;
    if (!id) return;
    this._confirm(id);
  }

  /**
   * @return {void}
   */
  private _fetchProducts(): void {
    this.showProgressBar = true;
    this._productService
      .getProducts(this.productDto)
      .pipe(
        finalize(() => {
          this.showProgressBar = false;
        }),
      )
      .subscribe((data: IProduct[]) => {
        this.showProgressBar = false;
        this._productService.total$.subscribe((total) => {
          this.totalItems = total;
        });
        this.dataSources$ = of(data);
      });
  }

  /**
   * @param {number} id
   * @return {void}
   */
  private _deleteProduct(id: number): void {
    this.showProgressBar = true;

    this._productService
      .deleteProducts(id)
      .pipe(
        finalize(() => {
          this.showProgressBar = false;
        }),
      )
      .subscribe((data: any) => {
        this._fetchProducts();
      });
  }

  /**
   * @param {number} id
   * @return {void}
   */
  private _confirm(id: number): void {
    this.confirm.confirm().subscribe((isAccepted: boolean) => {
      if (isAccepted) {
        return this._deleteProduct(id);
      }
      this.confirm.isShow = false;
    });
  }
}
