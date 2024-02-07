import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  showPassword = false;
  EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private navController: NavController,
  ) { }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.register(form);
    } else {
      this.showErrorToast();
    }
  }

  register(form: NgForm) {
    this.loadingController.create({
      keyboardClose: true,
      message: 'Signing Up...',
    }).then(loadingElement => {
      loadingElement.present();
      this.authService.register({
        name: form.value.name,
        email: form.value.username,
        password: form.value.password,
      }).subscribe({
        next: (response: any) => {
          loadingElement.dismiss();
          this.navController.navigateBack(['/auth']);
          this.toastController.create({
            message: 'Registration successful! Please login to continue.',
            duration: 2000,
            position: 'top',
            color: 'success',
            buttons: [
              {
                icon: 'alert-circle-outline',
                role: 'cancel',
                side: 'start'
              }
            ]
          }).then(toastElement => toastElement.present());
        }, error: (error) => {
          loadingElement.dismiss();
          this.showErrorAlert(error, form);
        }
      });
    });
  }

  openLoginPage() {
    this.navController.navigateBack('auth/login');
  }

  private showErrorAlert(error: any, form: NgForm) {
    this.alertController.create({
      header: 'Sign Up Failed',
      message: error.error?.message ? error.error.message : error.status === 0 ? 'The application failed to communicate with the server.' : error.status === 404 ? 'The required resource not found.' : 'An unexpected error has occurred. Please try again later.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        },
        {
          text: 'Try Again',
          role: 'confirm',
          handler: () => {
            this.register(form);
          }
        }
      ]
    }).then(alertElement => alertElement.present());
  }

  private showErrorToast() {
    this.toastController.getTop().then(toast => {
      if (!toast) {
        this.toastController.create({
          message: 'Please make sure all required field are filled!',
          duration: 2000,
          position: 'top',
          color: 'danger',
          buttons: [
            {
              icon: 'alert-circle-outline',
              role: 'cancel',
              side: 'start'
            }
          ]
        }).then(toastElement => toastElement.present());
      }
    });
  }

}
