import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildEditPageRoutingModule } from './child-edit-routing.module';

import { ChildEditPage } from './child-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildEditPageRoutingModule
  ],
  declarations: [ChildEditPage]
})
export class ChildEditPageModule {}
