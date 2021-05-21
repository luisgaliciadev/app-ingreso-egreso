import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ingresoEgresoAppState } from '../ingreso-egreso.redcuer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {
  totalIngresos: number;
  totalEgresos: number;
  cantIngresos: number;
  cantEgresos: number;
  subscription: Subscription = new Subscription();

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    public _Store: Store<ingresoEgresoAppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this._Store.select('ingresoEgreso').subscribe(
      ingresoEgreso => {
        this.contarIngresoEgreso(ingresoEgreso.items);
      }
    );
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.cantIngresos = 0;
    this.cantEgresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.cantIngresos++;
        this.totalIngresos += item.monto;
      }
      if (item.tipo === 'egreso') {
        this.cantEgresos++;
        this.totalEgresos += item.monto;
      }
    });
    this.doughnutChartData = [this.totalIngresos, this.totalEgresos]
  }

}
