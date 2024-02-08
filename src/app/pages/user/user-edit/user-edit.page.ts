import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage {
  name: string = '';
  tel: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  status: boolean = true;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private userService: UserService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userService.edit({
        id: params.get('id'),
      }).subscribe({
        next: (response: any) => {
          this.name = response.data.name;
          this.tel = response.data.tel;
          this.email = response.data.email;
          this.role = response.data.role;
          this.status = response.data.status;
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
        header: 'Update User',
        message: 'Are you sure you want to update this user?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Confirm',
            handler: () => {
              this.userService.update({
                id: this.activatedRoute.snapshot.paramMap.get('id'),
                name: this.name,
                tel: this.tel,
                password: this.password,
                role: this.role,
                status: this.status,
              }).subscribe({
                next: (response: any) => {
                  this.showToast('User updated successfully!', 2000, 'checkmark');
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
