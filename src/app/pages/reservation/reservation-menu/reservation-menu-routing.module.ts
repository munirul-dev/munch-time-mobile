import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationMenuPage } from './reservation-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationMenuPageRoutingModule {}
