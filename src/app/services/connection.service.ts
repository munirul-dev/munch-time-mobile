import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor() { }

  get api() {
    return environment.server + environment.api;
  }

  get auth() {
    return {
      login: 'auth/login',
      forgot: 'auth/forgot',
      register: 'auth/register',
      validate: 'auth/validate',
      logout: 'auth/logout',
      updateProfile: 'auth/updateProfile'
    };
  }

  get user() {
    return {
      index: 'user/index',
      create: 'user/create',
      edit: 'user/edit',
      update: 'user/update',
      destroy: 'user/destroy'
    };
  }

  get student() {
    return {
      index: 'student/index',
      create: 'student/create',
      edit: 'student/edit',
      update: 'student/update',
      destroy: 'student/destroy'
    };
  }

  get menu() {
    return {
      index: 'menu/index',
      create: 'menu/create',
      edit: 'menu/edit',
      update: 'menu/update',
      destroy: 'menu/destroy'
    };
  }

  get reservation() {
    return {
      index: 'reservation/index',
      create: 'reservation/create',
      repay: 'reservation/repay',
      edit: 'reservation/edit',
      cancel: 'reservation/cancel',
      scanQR: 'reservation/scanQR',
      redeem: 'reservation/redeem',
    };
  }

  get payment() {
    return {
      index: 'payment/index',
      makePayment: 'payment/makePayment',
      fetchPaymentStatus: 'payment/fetchPaymentStatus'
    };
  }

  get settlement() {
    return {
      index: 'settlement/index',
      makeWithdrawal: 'settlement/makeWithdrawal',
      processWithdrawal: 'settlement/processWithdrawal'
    };
  }

  options(token: string) {
    return {
      headers: {
        'Content-Type': 'application/json;',
        Authorization: 'Bearer ' + token,
      }
    };
  }

  formDataOptions(token: string) {
    return {
      headers: {
        enctype: 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    };
  }
}
