import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Payment } from 'src/app/model/payment.model';
import { Reservation } from 'src/app/model/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.page.html',
  styleUrls: ['./reservation-edit.page.scss'],
})
export class ReservationEditPage {
  isLoading: boolean = true;
  loadedData!: Reservation;
  loadedPayment!: Payment;

  constructor(
    private reservationService: ReservationService,
    private alertController: AlertController,
    private toastController: ToastController,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.reservationService.edit({
        id: params.get('id'),
      }).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.loadedData = response.data;
          this.loadedPayment = response.payment;
        }, error: (error: any) => {
          this.isLoading = false;
          this.showToast('An error occurred, please try again later!', 2000, 'warning');
        }
      });
    });
  }

  cancelReservation(item: Reservation) {
    this.alertController.create({
      header: 'Cancel Reservation',
      message: 'Are you sure you want to cancel this reservation?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.isLoading = true;
            this.reservationService.delete({
              id: item.id,
            }).subscribe({
              next: (response: any) => {
                this.isLoading = false;
                this.showAlert('Success', 'Reservation has been canceled successfully!');
                this.navController.navigateBack('/pages/reservations');
              }, error: (error: any) => {
                this.isLoading = false;
                this.showToast('An error occurred, please try again later!', 2000, 'warning');
              }
            });
          }
        },
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  makePayment() {
    // TODO
  }

  private showAlert(title: string, text: string) {
    this.alertController.create({
      header: title,
      message: text,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    }).then(alertElement => {
      alertElement.present();
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

}
