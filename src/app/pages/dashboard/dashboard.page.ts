import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  isLoading = true;
  loadedChild: any[] = [];
  currentUser!: User;
  totalAmount: number = 0;
  lastestTransaction: {
    amount: number,
    date: string,
  } = {
    amount: 0,
    date: '-',
  };

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.userData.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.isLoading = false;
      }
    });
  }

}
