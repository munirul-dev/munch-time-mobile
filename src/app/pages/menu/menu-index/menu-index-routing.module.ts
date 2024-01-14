import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuIndexPage } from './menu-index.page';

const routes: Routes = [
  {
    path: '',
    component: MenuIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuIndexPageRoutingModule {}
