import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildIndexPage } from './child-index.page';

const routes: Routes = [
  {
    path: '',
    component: ChildIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildIndexPageRoutingModule {}
