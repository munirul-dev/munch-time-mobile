import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrConfirmationPageRoutingModule } from './qr-confirmation-routing.module';

import { QrConfirmationPage } from './qr-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrConfirmationPageRoutingModule
  ],
  declarations: [QrConfirmationPage]
})
export class QrConfirmationPageModule {}
