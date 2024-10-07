import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ProductListComponent } from './product-list.component'

@Component({
	standalone: true,
	selector: 'app-home',
	templateUrl: '../templates/product.component.html',
	styleUrls: ['../styles/product.component.scss'],
	imports: [CommonModule, FormsModule, ProductListComponent]
})
export class ProductComponent {
}
