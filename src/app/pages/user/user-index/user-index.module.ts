import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserIndexPageRoutingModule } from './user-index-routing.module';

import { UserIndexPage } from './user-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserIndexPageRoutingModule
  ],
  declarations: [UserIndexPage]
})
export class UserIndexPageModule {}
