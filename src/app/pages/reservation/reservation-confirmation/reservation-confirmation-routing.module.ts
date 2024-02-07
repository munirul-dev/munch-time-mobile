import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationConfirmationPage } from './reservation-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationConfirmationPageRoutingModule {}
