import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationIndexPageRoutingModule } from './reservation-index-routing.module';

import { ReservationIndexPage } from './reservation-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationIndexPageRoutingModule
  ],
  declarations: [ReservationIndexPage]
})
export class ReservationIndexPageModule {}
