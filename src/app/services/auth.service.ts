import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, filter, from, map, switchMap, take, tap } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AlertController, NavController } from '@ionic/angular';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);
  private _token: string = '';
  private triggerGetMenu = new Subject<void>();
  public onTriggerGetMenu = this.triggerGetMenu.asObservable();

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navController: NavController,
    private alertController: AlertController,
    private connections: ConnectionService,
  ) { }

  get auth() {
    return from(this.storage.get('user')).pipe(
      take(1),
      map((storedData: User) => {
        if (storedData) {
          return storedData;
        } else {
          return null;
        }
      }),
    );
  }

  get userData() {
    return this._user.asObservable();
  }

  get userIsAuthenticated() {
    return this.auth.pipe(
      switchMap((auth: User | null) => {
        this._token = auth ? auth.token : '';
        if (this._token) {
          return this.http.post(this.connections.api + this.connections.auth.validate, null, this.connections.options(this._token));
        } else {
          return 'false';
        }
      }),
      catchError(error => {
        if (error.status === 0) {
          return 'true';
        } else if (error.status === 503) {
          return 'maintenance';
        } else {
          return 'false';
        }
      }),
      take(1),
      map((responseData: any) => {
        if (responseData.status === 'success') {
          const user: User = responseData.user;
          user.token = this._token;
          this.storeUserData(user);
          return true;
        } else if (responseData === 't') {
          this.storage.get('user').then((user: User) => {
            this._user.next(user);
          });
          return true;
        } else if (responseData === 'm') {
          this.alertController.create({
            header: 'Maintenance Mode',
            message: 'Application is undergoing maintenance',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.navController.navigateForward(['/error/maintenance']);
                }
              },
            ]
          }).then(alertElement => {
            alertElement.present();
          });
          return true;
        } else {
          return false;
        }
      }),
    );
  }

  login(body: any) {
    return this.http.post(this.connections.api + this.connections.auth.login, body, {
      headers: {
        'Content-Type': 'application/json;'
      }
    }).pipe(
      take(1),
      map((result: any) => result.user),
      tap(this.storeUserData.bind(this)),
    );
  }

  logout() {
    return this.auth.pipe(
      filter((auth: User | null): auth is User => auth !== null),
      switchMap((auth: User) => this.http.post(this.connections.api + this.connections.auth.logout, null, this.connections.options(auth.token))),
      catchError(error => 'false'),
      take(1),
      tap(() => {
        this.autoLogout();
      }),
    );
  }

  updateProfile(body: any) {
    return this.auth.pipe(
      filter((auth: User | null): auth is User => auth !== null),
      switchMap((auth: User) => {
        this._token = auth.token;
        return this.http.post(this.connections.api + this.connections.auth.updateProfile, body, this.connections.options(this._token));
      }),
      take(1),
      map((responseData: any) => {
        const user: User = responseData.user;
        user.token = this._token;
        return user;
      }),
      tap(this.storeUserData.bind(this)),
    );
  }

  handleError(error: any) {
    if (error.status === 401) {
      return this.terminateSession();
    } else {
      return error;
    }
  }

  terminateSession() {
    this.alertController.create({
      header: 'Oops!',
      message: 'Your session has expired. Please login again.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            this.autoLogout();
          },
        },
      ],
    }).then((alertElement) => {
      alertElement.present();
    });
  }

  autoLogin(): Observable<boolean | null> {
    return from(this.storage.get('user')).pipe(
      take(1),
      map((storedData: User) => {
        if (!storedData) {
          return null;
        } else {
          const user: User = storedData;
          user.token = this._token;
          return user;
        }
      }),
      tap((user: User | null) => {
        if (user) {
          this._user.next(user);
        }
      }),
      map((user: User | null) => !!user),
    );
  }

  autoLogout() {
    this.storage.remove('user');
    this._user.next(null);
    this.navController.navigateBack('/auth');
  }

  private async storeUserData(user: User) {
    await this.storage.set('user', user);
    this._user.next(user);
    this.triggerGetMenu.next();
  }
}
