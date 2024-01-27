import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'/login', pathMatch:'full'},
    {path:'login', component:LoginComponent, canActivate:[guestGuard]},
    {path:'home', component:HomeComponent, canActivate:[authGuard]},
    {path:'products', component:ProductsComponent, canActivate:[authGuard]}
];
