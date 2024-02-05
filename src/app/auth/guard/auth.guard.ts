import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private navController: NavController
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userIsAuthenticated.pipe(
      take(1),
      switchMap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          return this.authService.autoLogin().pipe(
            map(autoLoginResult => {
              if (autoLoginResult !== null) {
                return autoLoginResult;
              } else {
                return false;
              }
            })
          );
        } else {
          return of(isAuthenticated);
        }
      }),
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.navController.navigateRoot('/auth');
        }
      })
    );
  }
}
