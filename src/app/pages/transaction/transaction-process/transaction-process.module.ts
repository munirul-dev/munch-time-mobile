import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionProcessPageRoutingModule } from './transaction-process-routing.module';

import { TransactionProcessPage } from './transaction-process.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionProcessPageRoutingModule
  ],
  declarations: [TransactionProcessPage]
})
export class TransactionProcessPageModule {}
