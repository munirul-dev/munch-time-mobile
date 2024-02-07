import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';
import { ConnectionService } from './connection.service';
import { Reservation } from '../model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _reservationList: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private connections: ConnectionService,
  ) { }

  get reservationList() {
    return this._reservationList.asObservable();
  }

  index() {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.reservation.index, null, this.connections.options(auth ? auth.token : ''))),
      take(1),
      map((result: any) => result.data),
      tap((data: Reservation[]) => this._reservationList.next(data)),
    );
  }

  create(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.reservation.create, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
    );
  }

  edit(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.reservation.edit, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
    );
  }

  update(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.reservation.update, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
    );
  }

  delete(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.reservation.destroy, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
    );
  }

}
