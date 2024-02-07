import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadChildren: () => import('./user/user-index/user-index.module').then( m => m.UserIndexPageModule)
          },
          {
            path: 'create',
            loadChildren: () => import('./user/user-create/user-create.module').then(m => m.UserCreatePageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('./user/user-edit/user-edit.module').then( m => m.UserEditPageModule)
          },
        ]
      },
      {
        path: 'childs',
        children: [
          {
            path: '',
            loadChildren: () => import('./child/child-index/child-index.module').then( m => m.ChildIndexPageModule)
          },
          {
            path: 'create',
            loadChildren: () => import('./child/child-create/child-create.module').then(m => m.ChildCreatePageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('./child/child-edit/child-edit.module').then( m => m.ChildEditPageModule)
          },
        ]
      },
      {
        path: 'menus',
        children: [
          {
            path: '',
            loadChildren: () => import('./menu/menu-index/menu-index.module').then( m => m.MenuIndexPageModule)
          },
          {
            path: 'create',
            loadChildren: () => import('./menu/menu-create/menu-create.module').then(m => m.MenuCreatePageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('./menu/menu-edit/menu-edit.module').then( m => m.MenuEditPageModule)
          },
        ]
      },
      {
        path: 'qr',
        children: [
          {
            path: '',
            loadChildren: () => import('./qr/qr-scan/qr-scan.module').then( m => m.QrScanPageModule)
          },
          {
            path: 'confirmation',
            loadChildren: () => import('./qr/qr-confirmation/qr-confirmation.module').then( m => m.QrConfirmationPageModule)
          },
        ]
      },
      {
        path: 'transactions',
        children: [
          {
            path: '',
            loadChildren: () => import('./transaction/transaction-index/transaction-index.module').then( m => m.TransactionIndexPageModule)
          },
          {
            path: 'withdraw',
            loadChildren: () => import('./transaction/transaction-withdraw/transaction-withdraw.module').then( m => m.TransactionWithdrawPageModule)
          },
          {
            path: 'process',
            loadChildren: () => import('./transaction/transaction-process/transaction-process.module').then( m => m.TransactionProcessPageModule)
          },
          {
            path: 'confirm',
            loadChildren: () => import('./transaction/transaction-confirm/transaction-confirm.module').then( m => m.TransactionConfirmPageModule)
          },
        ]
      },
      {
        path: 'reservations',
        children: [
          {
            path: '',
            loadChildren: () => import('./reservation/reservation-index/reservation-index.module').then( m => m.ReservationIndexPageModule)
          },
          {
            path: 'create',
            children: [
              {
                path: '', // Child Selection
                loadChildren: () => import('./reservation/reservation-select/reservation-select.module').then(m => m.ReservationSelectPageModule)
              },
              {
                path: ':childId', // Menu Selection
                loadChildren: () => import('./reservation/reservation-menu/reservation-menu.module').then(m => m.ReservationMenuPageModule)
              },
              {
                path: ':childId/:menuId', // Confirmation
                loadChildren: () => import('./reservation/reservation-confirmation/reservation-confirmation.module').then(m => m.ReservationConfirmationPageModule)
              },
            ]
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('./reservation/reservation-edit/reservation-edit.module').then( m => m.ReservationEditPageModule)
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
