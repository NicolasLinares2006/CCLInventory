import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovimientoComponent } from './movimiento/movimiento.component';
import { InventarioComponent } from './inventario/inventario.component';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'movimiento', component: MovimientoComponent, canActivate: [AuthGuard] },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];