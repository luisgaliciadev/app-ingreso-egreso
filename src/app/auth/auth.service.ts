import { Injectable } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';
import { User } from './register/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { SetUserAction } from './auth.accions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loading = false;
  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(
    private _AngularFireAuth: AngularFireAuth,
    private _Router: Router,
    private _AngularFirestore: AngularFirestore,
    private _Store: Store<AppState>
  ) { }

  initAuthListener() {
    this._AngularFireAuth.authState.subscribe( fbUser => {
      if (fbUser) {
        this.userSubscription = this._AngularFirestore.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe(
          (userFb: any) => {
            const newUser = new User(userFb);
            this.usuario = newUser;
            this._Store.dispatch(new SetUserAction(newUser));
          }
        );
      } else {
          if (this.userSubscription) {
            this.usuario = {nombre: '', email: '', uid: ''};
            this.userSubscription.unsubscribe();
          }
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {   
    this._Store.dispatch(new ActivarLoadingAction());
    this._AngularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( (response: any) => {
      const user: User = {
        uid: response.user.uid,
        nombre: nombre,
        email: response.user.email
      };
      this._AngularFirestore.doc(`${user.uid}/usuario`).set(user)
      .then( ()=> {
        console.log(user);
        Swal.fire('Mensaje', 'Usuario registrado correctamente.','success');
        this._Router.navigate(['/login']);      
        this._Store.dispatch(new DesactivarLoadingAction());
      });
    })
    .catch( (error) => {
      Swal.fire('Error en registro',error.message, 'error');
      this._Store.dispatch(new DesactivarLoadingAction());
    });
  }

  login(email: string, password: string) {
    this._Store.dispatch(new ActivarLoadingAction());
    this._AngularFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then( () => {      
      this._Router.navigate(['/dahsboard']);
      this._Store.dispatch(new DesactivarLoadingAction());
    })
    .catch( (error) => {
      Swal.fire('Error en login',error.message, 'error');
      this._Store.dispatch(new DesactivarLoadingAction());
    });
  }

  loguot() {
    this._Router.navigate(['/login']);
    this._AngularFireAuth.auth.signOut();
    let user: User = {
      nombre: '',
      email: '',
      uid: ''
    }
    this._Store.dispatch(new SetUserAction(user));
  }

  isAuth() {
    return this._AngularFireAuth.authState.pipe(
      map(fbUser => {
        if (!fbUser) {
          this._Router.navigate(['/login']);
        }
        return fbUser != null
      }) 
    );
  }

  getUsuario() {
    return {... this.usuario};
  }

}
