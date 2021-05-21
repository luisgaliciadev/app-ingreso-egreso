import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../auth/auth.service';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre: string;
  subscription: Subscription = new Subscription()

  constructor(
    private _AuthService: AuthService,
    private _Store: Store<AppState>,
    public _IngresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.subscription = this._Store.select('auth')
    .pipe(
      filter( auth => auth.user.nombre.length > 0)
    )
    .subscribe(
      auth => this.nombre = auth.user.nombre
    );
  }

  logout() {
    this._AuthService.loguot();
    this._IngresoEgresoService.cancelSubscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
