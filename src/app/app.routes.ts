import { Routes } from '@angular/router';
import { adminGuardGuard } from './admin-guard.guard';
import { inject } from '@angular/core';


export const routes: Routes = [
    {
        path: 'admin',
        loadComponent: () => import('./pages/admin-home/admin-home.component').then(c => c.AdminHomeComponent),
        canActivate: [adminGuardGuard],
        children: [
            {
                path: '',
                canActivate: [adminGuardGuard],
                loadComponent: () => import('./components/main/main.component').then(c => c.MainComponent)
            },
            {
                path: 'products',
                canActivate: [adminGuardGuard],
                loadComponent: () => import('./components/products/products.component').then(c => c.ProductsComponent)
            },
            {
                path: 'users',
                canActivate: [adminGuardGuard],
                loadComponent: () => import('./components/users/users.component').then(c => c.UsersComponent)
            }
        ],
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
        path: '**',
        loadComponent: () => import('./pages/admin-home/admin-home.component').then(c => c.AdminHomeComponent)
    }
];
