import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['welcome/login']);

const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs/home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./presentation/presentation.module').then(
        (m) => m.PresentationPageModule
      ),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./login-end-register/login-end-register.module').then(
        (m) => m.LoginEndRegisterPageModule
      ),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule),
  //   ...canActivate(redirectUnauthorizedToLogin),
  // },
  // {
  //   path: 'favorites',
  //   loadChildren: () =>
  //     import('./favorites/favorites.module').then((m) => m.FavoritesPageModule),
  // },
  // {
  //   path: 'orders',
  //   loadChildren: () =>
  //     import('./orders/orders.module').then((m) => m.OrdersPageModule),
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
