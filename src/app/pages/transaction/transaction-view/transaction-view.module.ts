import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionViewPageRoutingModule } from './transaction-view-routing.module';

import { TransactionViewPage } from './transaction-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionViewPageRoutingModule
  ],
  declarations: [TransactionViewPage]
})
export class TransactionViewPageModule {}
