import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userList: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private connections: ConnectionService,
  ) { }

  get userList() {
    return this._userList.asObservable();
  }

  index() {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.user.index, null, this.connections.options(auth ? auth.token : ''))),
      take(1),
      map((result: any) => result.data),
      tap((users: User[]) => this._userList.next(users)),
    );
  }

  create(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.user.create, body, this.connections.formDataOptions(auth ? auth.token : ''))),
      take(1),
    );
  }

  edit(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.user.edit, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
    );
  }

  update(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.user.update, body, this.connections.formDataOptions(auth ? auth.token : ''))),
      take(1),
    );
  }

  delete(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.user.destroy, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
    );
  }

}
