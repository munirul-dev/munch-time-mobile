import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationCreatePage } from './reservation-create.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationCreatePageRoutingModule {}
