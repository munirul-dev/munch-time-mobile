import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrConfirmationPage } from './qr-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: QrConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrConfirmationPageRoutingModule {}
