import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-reservation-select',
  templateUrl: './reservation-select.page.html',
  styleUrls: ['./reservation-select.page.scss'],
})
export class ReservationSelectPage implements OnInit, OnDestroy {
  isLoading: boolean = true;
  loadedStudent: Student[] = [];
  private studentSub!: Subscription;

  constructor(
    private studentService: StudentService,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.studentSub = this.studentService.studentList.subscribe(data => {
      this.loadedStudent = data;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.studentService.index().subscribe({
      next: (response: any) => {
        this.isLoading = false;
      }, error: (error: any) => {
        this.isLoading = false;
        this.showToast('An error occurred, please try again later!', 2000, 'warning');
      }
    });
  }

  ngOnDestroy() {
    if (this.studentSub) {
      this.studentSub.unsubscribe();
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
