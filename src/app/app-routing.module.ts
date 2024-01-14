import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'forgot',
        loadChildren: () => import('./auth/forgot/forgot.module').then(m => m.ForgotPageModule)
      },
    ]
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesPageModule),
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./error/maintenance/maintenance.module').then(m => m.MaintenancePageModule)
  },
  {
    path: '**',
    redirectTo: 'error/not-found'
  },
  {
    path: 'error/not-found',
    loadChildren: () => import('./error/not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
