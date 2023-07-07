import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
