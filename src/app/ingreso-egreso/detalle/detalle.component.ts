import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import { ingresoEgresoAppState } from '../ingreso-egreso.redcuer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();
  loading: boolean;
  subscriptionLoading: Subscription = new Subscription();

  constructor(
    private _Store: Store<ingresoEgresoAppState>,
    public _IngresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.subscription = this._Store.select('ingresoEgreso').subscribe(
      (ingresoEgreso) => {
        this.items = ingresoEgreso.items;
      }
    );

    this.subscriptionLoading = this._Store.select('ui').subscribe(
      (ui) => {
        this.loading = ui.isLoading;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionLoading.unsubscribe();
  }

  borrarItem(uid: any) {
    this._IngresoEgresoService.borrarIngresoEgreso(uid.toString());
  }

}
