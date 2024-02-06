import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-child-index',
  templateUrl: './child-index.page.html',
  styleUrls: ['./child-index.page.scss'],
})
export class ChildIndexPage implements OnInit, OnDestroy {
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

  deleteItem(item: Student) {
    this.alertController.create({
      header: 'Delete Child',
      message: 'Are you sure you want to delete this child?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: () => {
            this.studentService.delete({
              id: item.id,
            }).subscribe({
              next: (response: any) => {
                this.showToast('Child deleted successfully!', 2000, 'checkmark');
                this.ionViewWillEnter();
              }, error: (error: any) => {
                this.showToast(error.error.message ? error.error.message : 'An error occurred, please try again later!', 2000, 'warning');
              }
            });
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
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
