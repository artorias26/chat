import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children:[
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full'
      },

      {
        path:'chat',
        loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
      },

      {
        path:'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
      path:'reciente',
      loadChildren: () => import('../reciente/reciente.module').then( m => m.RecientePageModule)
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
