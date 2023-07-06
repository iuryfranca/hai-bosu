import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApresentationPage } from './apresentation.page';

const routes: Routes = [
  {
    path: '',
    component: ApresentationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApresentationPageRoutingModule {}
