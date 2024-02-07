import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationConfirmationPageRoutingModule } from './reservation-confirmation-routing.module';

import { ReservationConfirmationPage } from './reservation-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationConfirmationPageRoutingModule
  ],
  declarations: [ReservationConfirmationPage]
})
export class ReservationConfirmationPageModule {}
