import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionWithdrawPage } from './transaction-withdraw.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionWithdrawPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionWithdrawPageRoutingModule {}
