import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
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

  onSubmit(dataForm: any) {
    this._AuthService.crearUsuario(dataForm.nombre, dataForm.email, dataForm.password);
  }

}
