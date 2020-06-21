import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversacionesPage } from './conversaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ConversacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversacionesPageRoutingModule {}
