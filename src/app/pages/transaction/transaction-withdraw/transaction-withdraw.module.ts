import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionWithdrawPageRoutingModule } from './transaction-withdraw-routing.module';

import { TransactionWithdrawPage } from './transaction-withdraw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionWithdrawPageRoutingModule
  ],
  declarations: [TransactionWithdrawPage]
})
export class TransactionWithdrawPageModule {}
