import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TopnavComponent } from './components/common/topnav/topnav.component';
import { LeftnavComponent } from './components/common/leftnav/leftnav.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ItemsComponent } from './components/items/items.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'cart-management', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'orders-management', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'orders-insight', component: AdminOrdersComponent, canActivate: [AuthGuard] },
  { path: 'item-control', component: ItemsComponent, canActivate: [AuthGuard] },
  { path: 'customers-sos', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  LoginComponent,
  RegistrationComponent,
  DashboardComponent,
  NotfoundComponent,
  TopnavComponent,
  LeftnavComponent,
  FooterComponent,
  CartComponent,
  OrdersComponent,
  AdminOrdersComponent,
  ItemsComponent,
  CustomersComponent
];
