import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(
    private _AuthService: AuthService
  ) { }

  canActivate() {
    return this._AuthService.isAuth();
  }

  canLoad() {
    return this._AuthService.isAuth();
    // return false;
    // return this._AuthService.isAuth().pipe(
    //   take(1)
    // );
  }
}
