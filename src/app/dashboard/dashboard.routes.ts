import { Routes } from '@angular/router';

// Componentes
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';

export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent},
    { path: 'ingreso-egreso', component: IngresoEgresoComponent},
    { path: 'detalle', component: DetalleComponent}
];

