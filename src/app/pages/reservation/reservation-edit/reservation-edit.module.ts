import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationEditPageRoutingModule } from './reservation-edit-routing.module';

import { ReservationEditPage } from './reservation-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationEditPageRoutingModule
  ],
  declarations: [ReservationEditPage]
})
export class ReservationEditPageModule {}
