import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { INavigation, NAVIGATION } from '@core/resources/navigation.resource'

@Component({
	standalone: true,
	selector: 'app-aside',
	templateUrl: './aside.component.html',
	styleUrls: ['./aside.component.scss'],
	imports: [CommonModule, RouterModule]
})
export class AsideComponent{
	protected readonly navigation: INavigation[] = NAVIGATION
  protected currentRoute : string ='';

  constructor(private _activatedRoute: ActivatedRoute) {


   }

}
