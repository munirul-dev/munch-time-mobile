import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuIndexPageRoutingModule } from './menu-index-routing.module';

import { MenuIndexPage } from './menu-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuIndexPageRoutingModule
  ],
  declarations: [MenuIndexPage]
})
export class MenuIndexPageModule {}
