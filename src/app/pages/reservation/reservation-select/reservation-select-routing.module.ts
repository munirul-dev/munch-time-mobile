import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationSelectPage } from './reservation-select.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationSelectPageRoutingModule {}
