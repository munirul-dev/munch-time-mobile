import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-child-edit',
  templateUrl: './child-edit.page.html',
  styleUrls: ['./child-edit.page.scss'],
})
export class ChildEditPage {
  name: string = '';
  year_level: string = '';
  class_name: string = '';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private studentService: StudentService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.studentService.edit({
        id: params.get('id'),
      }).subscribe({
        next: (response: any) => {
          this.name = response.data.name;
          this.year_level = response.data.year_level;
          this.class_name = response.data.class_name;
        }, error: (error: any) => {
          this.showToast('An error occurred, please try again later!', 2000, 'warning');
        }
      });
    });
  }

  submitForm(form: NgForm) {
    if (!form.valid) {
      this.showAlert('Form Incomplete', 'Please complete the form properly!');
    } else {
      this.alertController.create({
        header: 'Update Child',
        message: 'Are you sure you want to update this child?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Confirm',
            handler: () => {
              this.studentService.update({
                id: this.activatedRoute.snapshot.paramMap.get('id'),
                name: this.name,
                year_level: this.year_level,
                class_name: this.class_name,
              }).subscribe({
                next: (response: any) => {
                  this.showToast('Child updated successfully!', 2000, 'checkmark');
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
