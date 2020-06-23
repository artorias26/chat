import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./componentes/registro/registro.module').then( m => m.RegistroPageModule)
  },

  {
    path: 'inicio',
    loadChildren: () => import('./componentes/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./componentes/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'conversaciones',
    loadChildren: () => import('./componentes/conversaciones/conversaciones.module').then( m => m.ConversacionesPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./componentes/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'conversacion',
    loadChildren: () => import('./componentes/conversacion/conversacion.module').then( m => m.ConversacionPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./componentes/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'reciente',
    loadChildren: () => import('./componentes/reciente/reciente.module').then( m => m.RecientePageModule)
  },  {
    path: 'listar-usuario',
    loadChildren: () => import('./componentes/listar-usuario/listar-usuario.module').then( m => m.ListarUsuarioPageModule)
  },
  {
    path: 'editar-usuario',
    loadChildren: () => import('./componentes/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
