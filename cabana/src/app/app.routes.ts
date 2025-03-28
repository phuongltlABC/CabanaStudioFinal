import { Routes } from '@angular/router';
import { OrdersSummaryComponent } from './pages/orders-summary/orders-summary.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

export const routes: Routes = [
  { path: '', component: OrdersSummaryComponent },
  { path: 'orders/:orderID', component: OrderDetailsComponent },
  { path: '**', redirectTo: '' }
];
