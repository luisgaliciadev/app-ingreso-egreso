import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  nombre: string;
  subscription: Subscription = new Subscription();

  constructor(
    private _Store: Store<AppState>
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

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
