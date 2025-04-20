import { Routes } from '@angular/router';
import { adminGuardGuard } from './admin-guard.guard';
import { inject } from '@angular/core';


export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/admin-home/admin-home.component').then(c => c.AdminHomeComponent),
        canActivate: [adminGuardGuard]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then(c => c.ProductsComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./pages/admin-home/admin-home.component').then(c => c.AdminHomeComponent)
    }
];
