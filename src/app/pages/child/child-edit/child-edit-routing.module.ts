import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildEditPage } from './child-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ChildEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildEditPageRoutingModule {}
