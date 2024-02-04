import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';
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
    // return this.authService.guardCheck.pipe(
    //   take(1),
    //   switchMap((isAuthenticated: boolean) => {
    //     if (!isAuthenticated) {
    //       return this.authService.autoLogin();
    //     } else {
    //       return of(isAuthenticated);
    //     }
    //   }),
    //   tap((isAuthenticated: boolean) => {
    //     if (!isAuthenticated) {
    //       this.navController.navigateRoot('/intro');
    //     }
    //   })
    // );
    return true;
  }
}
