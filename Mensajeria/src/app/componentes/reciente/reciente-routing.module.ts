import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecientePage } from './reciente.page';

const routes: Routes = [
  {
    path: '',
    component: RecientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecientePageRoutingModule {}
