import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Products } from './products/products';
import { CartComponent } from './cart/cart';
import { AddProduct } from './add-product/add-product';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login},
  { path: 'register', component: Register },
  { path: 'products', component: Products },
  { path: 'cart', component: CartComponent },
  { path: 'add-product', component: AddProduct }
];
