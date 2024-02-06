import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.page.html',
  styleUrls: ['./user-create.page.scss'],
})
export class UserCreatePage {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  status: boolean = true;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private userService: UserService,
    private navController: NavController,
  ) { }

  submitForm(form: NgForm) {
    if (!form.valid) {
      this.showAlert('Form Incomplete', 'Please complete the form properly!');
    } else {
      this.alertController.create({
        header: 'Create User',
        message: 'Are you sure you want to create this user?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Confirm',
            handler: () => {
              this.userService.create({
                name: this.name,
                email: this.email,
                password: this.password,
                role: this.role,
                status: this.status,
              }).subscribe({
                next: (response: any) => {
                  this.showToast('User created successfully!', 2000, 'checkmark');
                  this.navController.navigateBack('/pages/users');
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
