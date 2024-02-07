import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/model/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-index',
  templateUrl: './reservation-index.page.html',
  styleUrls: ['./reservation-index.page.scss'],
})
export class ReservationIndexPage implements OnInit, OnDestroy {
  isLoading: boolean = true;
  loadedReservation: Reservation[] = [];
  private reservationSub!: Subscription;

  constructor(
    private reservationService: ReservationService,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.reservationSub = this.reservationService.reservationList.subscribe(data => {
      this.loadedReservation = data;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.reservationService.index().subscribe({
      next: (response: any) => {
        this.isLoading = false;
      }, error: (error: any) => {
        this.isLoading = false;
        this.showToast('An error occurred, please try again later!', 2000, 'warning');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.reservationSub) {
      this.reservationSub.unsubscribe();
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
