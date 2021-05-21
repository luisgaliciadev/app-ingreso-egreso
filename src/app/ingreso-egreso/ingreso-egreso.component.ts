import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubscription: Subscription = new Subscription();
  loading: boolean;

  constructor(
    public _IngresoEgresoService: IngresoEgresoService,
    private _Store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loadingSubscription = this._Store.select('ui').subscribe( ui => this.loading = ui.isLoading);

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    })
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  crearIngresoEgreso() {    
    this._Store.dispatch(new ActivarLoadingAction());
    let ingresoEgreso = new IngresoEgreso({...this.forma.value, tipo: this.tipo});
    this._IngresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then( () => {
      this.forma.reset({monto: 0});
      this.tipo = 'ingreso';
      Swal.fire('Mensaje','Registro guardado correctamente', 'success');
      this._Store.dispatch(new DesactivarLoadingAction());
    })
    .catch( (error) => {
      Swal.fire('Error',error.message, 'error');
      this._Store.dispatch(new DesactivarLoadingAction());
    })
    
  }

}
