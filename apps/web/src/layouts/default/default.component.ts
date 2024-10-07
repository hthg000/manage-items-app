import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AsideComponent, HeaderComponent } from '@shared/index'

@Component({
	standalone: true,
	selector: 'app-layout-default',
	templateUrl: './default.component.html',
	styleUrls: ['./default.component.scss'],
	imports: [CommonModule, RouterModule, AsideComponent, HeaderComponent]
})
export class DefaultComponent {}
