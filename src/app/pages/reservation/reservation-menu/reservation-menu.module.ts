import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationMenuPageRoutingModule } from './reservation-menu-routing.module';

import { ReservationMenuPage } from './reservation-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationMenuPageRoutingModule
  ],
  declarations: [ReservationMenuPage]
})
export class ReservationMenuPageModule {}
