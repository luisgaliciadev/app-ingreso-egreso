import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  subscription: Subscription = new Subscription();

  constructor(
    public _AuthService: AuthService,
    public _Store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this._Store.select('ui').subscribe(
                        (ui) => {
                          this.loading = ui.isLoading;
                        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login(dataForm: any) {
    this._AuthService.login(dataForm.email, dataForm.password);
  }

}
