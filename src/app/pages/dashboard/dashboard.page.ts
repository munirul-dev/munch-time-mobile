import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/model/reservation.model';
import { Student } from 'src/app/model/student.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  isLoading = true;
  currentUser!: User;

  dailyAmount: number = 0;
  lastestTransaction: {
    amount: number,
    date: string,
  } = {
      amount: 0,
      date: '-',
    };
  students: Student[] = [];
  reservations: Reservation[] = [];
  count_user: {
    admin: number,
    canteen_worker: number,
    parent: number,
    student: number,
  } = {
      admin: 0,
      canteen_worker: 0,
      parent: 0,
      student: 0,
    };
  count_payment: {
    success: number,
    failed: number,
    pending: number,
  } = {
      success: 0,
      failed: 0,
      pending: 0,
    };
  count_reservation: {
    unpaid: number,
    redeemed: number,
    cancelled: number,
    pending: number,
  } = {
      unpaid: 0,
      redeemed: 0,
      cancelled: 0,
      pending: 0,
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

  ionViewWillEnter() {
    this.isLoading = true;
    this.authService.dashboard().subscribe((responseData: any) => {
      this.dailyAmount = responseData.data.dailyAmount;
      this.lastestTransaction = responseData.data.lastestTransaction;
      this.students = responseData.data.students;
      this.reservations = responseData.data.reservations;
      this.count_user = responseData.data.count_user;
      this.count_payment = responseData.data.count_payment;
      this.count_reservation = responseData.data.count_reservation;
      this.isLoading = false;
    });
  }

}
