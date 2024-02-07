import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { concatMap } from 'rxjs';
import { Menu } from 'src/app/model/menu.model';
import { Student } from 'src/app/model/student.model';
import { MenuService } from 'src/app/services/menu.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-reservation-confirmation',
  templateUrl: './reservation-confirmation.page.html',
  styleUrls: ['./reservation-confirmation.page.scss'],
})
export class ReservationConfirmationPage {
  isLoading: boolean = true;
  selectedStudent!: Student;
  selectedStudentId: number = 0;
  selectedMenu!: Menu;
  selectedMenuId: number = 0;
  totalQuantity: number = 1;
  totalAmount: number = 0;
  todayDate: Date = new Date();
  selectedDate: string = this.todayDate.toISOString();

  constructor(
    private menuService: MenuService,
    private studentService: StudentService,
    private alertController: AlertController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private navController: NavController,
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.selectedStudentId = Number(params.get('childId'));
      this.selectedMenuId = Number(params.get('menuId'));
      this.studentService.edit({
        id: params.get('childId'),
      }).pipe(
        concatMap((student: any) => {
          this.selectedStudent = student.data;
          return this.menuService.edit({ id: params.get('menuId') });
        }),
      ).subscribe({
        next: (menu: any) => {
          this.selectedMenu = menu.data;
          this.isLoading = false;
        }, error: (error: any) => {
          this.showToast('An error occurred, please try again later!', 2000, 'warning');
        }
      });
    });
  }

  increaseCount() {
    this.totalQuantity++;
    this.totalAmount = this.selectedMenu.price * this.totalQuantity;
  }

  decreaseCount() {
    if (this.totalQuantity > 1) {
      this.totalQuantity--;
      this.totalAmount = this.selectedMenu.price * this.totalQuantity;
    }
  }

  confirmReservation() {
    this.alertController.create({
      header: 'Confirm Reservation',
      message: 'Are you sure you want to confirm this reservation?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.isLoading = true;
            this.reservationService.create({
              menuId: this.selectedMenuId,
              studentId: this.selectedStudentId,
              quantity: this.totalQuantity,
              date: this.selectedDate.split('T')[0],
            }).subscribe({
              next: (response: any) => {
                this.isLoading = false;
                this.navController.navigateBack('/pages/reservations');
                if (response.data) {
                  window.open(response.data, '_self');
                } else {
                  this.showToast('An error occurred, please try again later!', 2000, 'warning');
                }
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
