import { Routes } from '@angular/router';
import { DefaultComponent } from '@layouts/index';
import { ProductComponent } from '@modules/index';

export const routes: Routes = [
{
  path: '',
  component: DefaultComponent,
  children: [
    {
      path: '',
      component: ProductComponent
    },
  ]
}
]
