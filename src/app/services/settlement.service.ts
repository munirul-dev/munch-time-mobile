import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';
import { ConnectionService } from './connection.service';
import { Settlement } from '../model/settlement.model';
import { Reservation } from '../model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class SettlementService {
  private _transactionList: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);
  private _settlementList: BehaviorSubject<Settlement[]> = new BehaviorSubject<Settlement[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private connections: ConnectionService,
  ) { }

  get transactionList() {
    return this._transactionList.asObservable();
  }

  get settlementList() {
    return this._settlementList.asObservable();
  }

  index() {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.settlement.transactions, null, this.connections.options(auth ? auth.token : ''))),
      take(1),
      map((result: any) => result.data),
      tap((data: any) => {
        this._transactionList.next(data.history);
        this._settlementList.next(data.settlements);
      }),
    );
  }

  checkWithdrawal() {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.settlement.checkWithdrawal, null, this.connections.options(auth ? auth.token : ''))),
      take(1),
      map((result: any) => result.data),
    );
  }

  makeWithdrawal(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.settlement.makeWithdrawal, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
      map((result: any) => result.data),
    );
  }

  processWithdrawal(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.settlement.processWithdrawal, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
      map((result: any) => result.data),
    );
  }

}
