import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/pages/dashboard', icon: 'home' },
  ];
  constructor(
    private storage: Storage,
    private platform: Platform,
  ) {
    const userRole: string = 'admin';

    switch (userRole) {
      case 'admin':
        this.appPages = [...this.appPages,
        { title: 'Users Management', url: '/pages/users', icon: 'people' },
        { title: 'Transactions', url: '/pages/transactions', icon: 'cash' },
        ];
        break;

      case 'canteen_worker':
        this.appPages = [...this.appPages,
        { title: 'Menus Management', url: '/pages/menus', icon: 'fast-food' },
        { title: 'Transactions', url: '/pages/transactions', icon: 'cash' },
        ];
        break;

      case 'parent':
        this.appPages = [...this.appPages,
        { title: 'Children', url: '/pages/childs', icon: 'people' },
        { title: 'Reservations', url: '/pages/reservations', icon: 'book' },
        { title: 'Transactions', url: '/pages/transactions', icon: 'cash' },
        ];
        break;

      default:
        break;
    }
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
    await this.storage.create();
  }
}
