import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/pages/dashboard', icon: 'home'},
    { title: 'Users Management', url: '/pages/users', icon: 'people' },
    { title: 'Menus Management', url: '/pages/menus', icon: 'fast-food' },
    { title: 'Children', url: '/pages/childs', icon: 'people' },
    { title: 'Transactions', url: '/pages/transactions', icon: 'cash' },
    { title: 'Reservations', url: '/pages/reservations', icon: 'book' },
  ];
  constructor() { }
}
