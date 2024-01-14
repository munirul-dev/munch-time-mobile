import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionIndexPageRoutingModule } from './transaction-index-routing.module';

import { TransactionIndexPage } from './transaction-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionIndexPageRoutingModule
  ],
  declarations: [TransactionIndexPage]
})
export class TransactionIndexPageModule {}
