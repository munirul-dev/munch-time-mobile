import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/model/reservation.model';
import { Settlement } from 'src/app/model/settlement.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SettlementService } from 'src/app/services/settlement.service';

@Component({
  selector: 'app-transaction-index',
  templateUrl: './transaction-index.page.html',
  styleUrls: ['./transaction-index.page.scss'],
})
export class TransactionIndexPage implements OnInit, OnDestroy {
  isLoading: boolean = true;
  totalTransaction: number = 0;
  loadedTransaction: Reservation[] = [];
  loadedSettlement: Settlement[] = [];
  currentUser!: User;
  date: Date = new Date();
  month: string = this.date.toLocaleString('default', { month: 'long' });
  private transactionSub!: Subscription;
  private settlementSub!: Subscription;

  constructor(
    private authService: AuthService,
    private settlementService: SettlementService,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.authService.userData.subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
    });
    this.transactionSub = this.settlementService.transactionList.subscribe(transactions => {
      this.loadedTransaction = transactions;
    });
    this.settlementSub = this.settlementService.settlementList.subscribe(settlements => {
      this.loadedSettlement = settlements;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.settlementService.index().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.totalTransaction = response.totalTransaction;
      }, error: (error: any) => {
        this.isLoading = false;
        this.showToast('An error occurred, please try again later!', 2000, 'warning');
      }
    });
  }

  ngOnDestroy() {
    if (this.transactionSub) {
      this.transactionSub.unsubscribe();
    }
    if (this.settlementSub) {
      this.settlementSub.unsubscribe();
    }
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
