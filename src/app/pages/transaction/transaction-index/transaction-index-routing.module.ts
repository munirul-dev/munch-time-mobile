import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionIndexPage } from './transaction-index.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionIndexPageRoutingModule {}
