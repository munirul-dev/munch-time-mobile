import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Settlement } from 'src/app/model/settlement.model';
import { SettlementService } from 'src/app/services/settlement.service';

@Component({
  selector: 'app-transaction-process',
  templateUrl: './transaction-process.page.html',
  styleUrls: ['./transaction-process.page.scss'],
})
export class TransactionProcessPage {
  settlement!: Settlement;

  constructor(
    private router: Router,
    private settlementService: SettlementService,
    private navContorller: NavController,
    private toastController: ToastController,
    private alertController: AlertController,
    private navController: NavController,
  ) {
    let parameter = this.router.getCurrentNavigation()?.extras.state;
    if (parameter) {
      this.settlement = parameter['settlement'];
    } else {
      this.navContorller.navigateBack('/pages/transactions');
    }
  }

  process() {
    this.alertController.create({
      header: 'Mark As Approved',
      message: 'Are you sure you want to mark this settlement as approved?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.processWithdrawal();
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  processWithdrawal() {
    this.settlementService.processWithdrawal({ id: this.settlement.id }).subscribe({
      next: (response: any) => {
        this.showToast('Settlement has been approved!', 2000, 'checkmark');
        this.navController.navigateBack('/pages/transactions');
      }, error: (error: any) => {
        this.showAlert('Error', error.error.message ? error.error.message : 'An error occurred, please try again later!');
      }
    });
  }

  private showToast(text: string, time: number, buttonIcon: string) {
    this.toastController.create({
      message: text,
      duration: time,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: buttonIcon,
          role: 'cancel',
        }
      ]
    }).then(toastElement => {
      toastElement.present();
    });
  }

  private showAlert(title: string, text: string) {
    this.alertController.create({
      header: title,
      message: text,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    }).then(toastElement => {
      toastElement.present();
    });
  }

}
