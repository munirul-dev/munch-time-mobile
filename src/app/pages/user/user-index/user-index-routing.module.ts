import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserIndexPage } from './user-index.page';

const routes: Routes = [
  {
    path: '',
    component: UserIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserIndexPageRoutingModule {}
