import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationSelectPageRoutingModule } from './reservation-select-routing.module';

import { ReservationSelectPage } from './reservation-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationSelectPageRoutingModule
  ],
  declarations: [ReservationSelectPage]
})
export class ReservationSelectPageModule {}
