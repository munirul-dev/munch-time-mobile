import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationIndexPage } from './reservation-index.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationIndexPageRoutingModule {}
