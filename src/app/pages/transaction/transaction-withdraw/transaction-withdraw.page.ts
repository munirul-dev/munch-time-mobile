import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { SettlementService } from 'src/app/services/settlement.service';

@Component({
  selector: 'app-transaction-withdraw',
  templateUrl: './transaction-withdraw.page.html',
  styleUrls: ['./transaction-withdraw.page.scss'],
})
export class TransactionWithdrawPage {
  isLoading: boolean = true;
  totalClaimAmount: number = 0;
  totalTransaction: number = 0;

  constructor(
    private settlementService: SettlementService,
    private toastController: ToastController,
    private alertController: AlertController,
    private navController: NavController,
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.settlementService.checkWithdrawal().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.totalClaimAmount = response.totalClaimAmount;
        this.totalTransaction = response.totalTransaction;
      }, error: (error: any) => {
        this.showAlert('Error', error.error.message ? error.error.message : 'An error occurred, please try again later!');
        this.isLoading = false;
      }
    });
  }

  confirm() {
    this.alertController.create({
      header: 'Confirm Withdrawal',
      message: 'Are you sure you want to withdraw your claim amount?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.makeWithdrawal();
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  makeWithdrawal() {
    this.settlementService.makeWithdrawal().subscribe({
      next: (response: any) => {
        this.showToast('Withdrawal request has been submitted!', 2000, 'checkmark');
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
