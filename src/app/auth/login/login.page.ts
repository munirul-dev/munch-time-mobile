import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private routerOutlet: IonRouterOutlet,
  ) { }

  ngOnInit() {
    this.routerOutlet.swipeGesture = false;
  }

  openRegisterPage() {

  }

  openResetPage() {

  }

}
