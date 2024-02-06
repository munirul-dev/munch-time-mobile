import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonRouterOutlet, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private navController: NavController,
  ) { }

  ngOnInit() {
    this.routerOutlet.swipeGesture = false;
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.authenticate(form);
    } else {
      this.showErrorToast();
    }
  }

  authenticate(form: NgForm) {
    this.loadingController.create({
      keyboardClose: true,
      message: 'Signing In...',
    }).then(loadingElement => {
      loadingElement.present();
      this.authService.login({
        username: form.value.username,
        password: form.value.password
      }).subscribe({
        next: (response: any) => {
          loadingElement.dismiss();
          this.navController.navigateForward(['/pages']);
        }, error: (error) => {
          loadingElement.dismiss();
          this.showErrorAlert(error, form);
        }
      });
    });
  }

  openRegisterPage() {
    this.navController.navigateForward('auth/register');
  }

  openResetPage() {
    this.navController.navigateForward('auth/forgot');
  }

  private showErrorAlert(error: any, form: NgForm) {
    this.alertController.create({
      header: 'Authentication Failed',
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
            this.authenticate(form);
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
