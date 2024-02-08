import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-child-create',
  templateUrl: './child-create.page.html',
  styleUrls: ['./child-create.page.scss'],
})
export class ChildCreatePage {
  name: string = '';
  age: number | null = null;
  year_level: string = '';
  class_name: string = '';
  allergies: string = '';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private studentService: StudentService,
    private navController: NavController,
  ) { }

  submitForm(form: NgForm) {
    if (!form.valid) {
      this.showAlert('Form Incomplete', 'Please complete the form properly!');
    } else {
      this.alertController.create({
        header: 'Create Child',
        message: 'Are you sure you want to create this child?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Confirm',
            handler: () => {
              this.studentService.create({
                name: this.name,
                age: this.age,
                year_level: this.year_level,
                class_name: this.class_name,
                allergies: this.allergies,
              }).subscribe({
                next: (response: any) => {
                  this.showToast('Child created successfully!', 2000, 'checkmark');
                  this.navController.navigateBack('/pages/childs');
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
