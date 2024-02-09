import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionViewPage } from './transaction-view.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionViewPageRoutingModule {}
