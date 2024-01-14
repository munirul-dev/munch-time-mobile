import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionProcessPage } from './transaction-process.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionProcessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionProcessPageRoutingModule {}
