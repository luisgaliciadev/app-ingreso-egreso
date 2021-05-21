import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  ingresEgresoListenerSubscription : Subscription = new Subscription();
  ingresEgresoItemsSubscription : Subscription = new Subscription();

  constructor(
    private _AngularFirestore: AngularFirestore,
    public _AuthService: AuthService,
    private _Store: Store<AppState>
  ) { }

  initIngresoEgresoListener() {
    this.ingresEgresoListenerSubscription = this._Store.select('auth')
    .pipe(filter(auth => auth.user.uid.length !== 0))
    .subscribe(auth => this.ingresoEgresoItems(auth.user.uid));
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresEgresoItemsSubscription = this._AngularFirestore.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(map(docData => {
      return docData.map(doc => {
        return {
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as {}
        };
      });
    }))
    .subscribe(
      (dataItems: any[]) => {
        this._Store.dispatch(new SetItemsAction(dataItems));
      });
  }

  cancelSubscription() {
    this.ingresEgresoItemsSubscription.unsubscribe();
    this.ingresEgresoListenerSubscription.unsubscribe();
    this._Store.dispatch(new UnsetItemsAction());
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    let user = this._AuthService.getUsuario();
    return this._AngularFirestore.doc(`${user.uid}/ingresos-egresos`).collection('items').add({...ingresoEgreso});
  }

  borrarIngresoEgreso(uid: string) {
    this._Store.dispatch(new ActivarLoadingAction());
    let user = this._AuthService.getUsuario();
    this._AngularFirestore.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete()
    .then( () => {
      Swal.fire('Mensaje', 'Registro eliminado correctamente.','success');
      this._Store.dispatch(new DesactivarLoadingAction());
    })
    .catch( error => {
      Swal.fire('Error',error.message, 'error');
      this._Store.dispatch(new DesactivarLoadingAction());
    })
  }  
}


