import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/pages/dashboard', icon: 'home' },
  ];
  constructor() {
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

  logout() {
    // do something
  }
}
