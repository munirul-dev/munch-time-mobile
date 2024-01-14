import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildCreatePageRoutingModule } from './child-create-routing.module';

import { ChildCreatePage } from './child-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildCreatePageRoutingModule
  ],
  declarations: [ChildCreatePage]
})
export class ChildCreatePageModule {}
