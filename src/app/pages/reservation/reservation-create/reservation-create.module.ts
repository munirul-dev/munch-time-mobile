import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationCreatePageRoutingModule } from './reservation-create-routing.module';

import { ReservationCreatePage } from './reservation-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationCreatePageRoutingModule
  ],
  declarations: [ReservationCreatePage]
})
export class ReservationCreatePageModule {}
