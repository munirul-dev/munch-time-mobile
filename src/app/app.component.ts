import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './services/auth.service';
import { User } from './model/user.model';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages: any = [];

  constructor(
    private storage: Storage,
    private platform: Platform,
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private menuController: MenuController,
  ) {
    this.authService.onTriggerGetMenu.subscribe(() => {
      this.getMenu();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // TODO
      // if (Capacitor.isPluginAvailable('SplashScreen')) {
      //   this.splashScreen.hide();
      // }
      // if (Capacitor.isPluginAvailable('Keyboard') && this.platform.is('ios')) {
      //   Keyboard.setAccessoryBarVisible({ isVisible: true });
      // }
    });
  }

  async ngOnInit() {
    this.menuController.swipeGesture(false);
    await this.storage.create();
    this.getMenu();
  }

  async getMenu() {
    this.storage.get('user').then((user: User) => {
      if (user) {
        switch (user.roles) {
          case 'admin':
            this.appPages = [
              { title: 'Users Management', url: '/pages/users', icon: 'people' },
              { title: 'Transactions', url: '/pages/transactions', icon: 'cash' },
            ];
            break;

          case 'canteen-worker':
            this.appPages = [
              { title: 'Menus Management', url: '/pages/menus', icon: 'fast-food' },
              { title: 'Transactions', url: '/pages/transactions', icon: 'cash' },
            ];
            break;

          case 'parent':
            this.appPages = [
              { title: 'Children', url: '/pages/childs', icon: 'people' },
              { title: 'Reservations', url: '/pages/reservations', icon: 'book' },
              { title: 'Transactions', url: '/pages/transactions', icon: 'cash' },
            ];
            break;

          default:
            this.appPages = [];
            break;
        }
      } else {
        this.appPages = [];
      }
    });
  }

  onLogout() {
    this.alertController.create({
      header: 'Logout',
      message: 'Are you sure to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.logout();
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  private logout() {
    this.menuController.close();
    this.loadingController.create({
      keyboardClose: true,
      message: 'Logging out...',
    }).then(loadingElement => {
      loadingElement.present();
      this.authService.logout().subscribe({
        next: () => {
          loadingElement.dismiss();
          this.showLogoutToast();
        }, error: () => {
          loadingElement.dismiss();
          this.authService.autoLogout();
          this.showLogoutToast();
        }
      });
    });
  }

  private showLogoutToast() {
    this.toastController.create({
      message: 'You has been successfully logged out.',
      position: 'top',
      duration: 2000,
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline',
        }
      ]
    }).then(toastElement => {
      toastElement.present();
    });
  }
}
