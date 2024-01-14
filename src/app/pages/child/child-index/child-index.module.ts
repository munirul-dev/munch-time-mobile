import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildIndexPageRoutingModule } from './child-index-routing.module';

import { ChildIndexPage } from './child-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildIndexPageRoutingModule
  ],
  declarations: [ChildIndexPage]
})
export class ChildIndexPageModule {}
