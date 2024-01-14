import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildCreatePage } from './child-create.page';

const routes: Routes = [
  {
    path: '',
    component: ChildCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildCreatePageRoutingModule {}
