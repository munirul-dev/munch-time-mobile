import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { Menu } from '../model/menu.model';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _menuList: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private connections: ConnectionService,
  ) { }

  get menuList() {
    return this._menuList.asObservable();
  }

  index() {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.menu.index, null, this.connections.options(auth ? auth.token : ''))),
      take(1),
      map((result: any) => result.data),
      tap((menus: Menu[]) => this._menuList.next(menus)),
    );
  }

  create(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.menu.create, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
    );
  }

  update(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.menu.update, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
    );
  }

  delete(body: any) {
    return this.authService.auth.pipe(
      switchMap((auth: User | null) => this.http.post(this.connections.api + this.connections.menu.destroy, body, this.connections.options(auth ? auth.token : ''))),
      take(1),
    );
  }

}
