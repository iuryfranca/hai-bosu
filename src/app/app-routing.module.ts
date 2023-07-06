import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./apresentation/apresentation.module').then(
        (m) => m.ApresentationPageModule
      ),
  },
  {
    path: 'apresentation',
    loadChildren: () =>
      import('./apresentation/apresentation.module').then(
        (m) => m.ApresentationPageModule
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
