import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPipe } from '../../pipe/search.pipe';
import { ListarUsuarioPageRoutingModule } from './listar-usuario-routing.module';

import { ListarUsuarioPage } from './listar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarUsuarioPageRoutingModule
  ],
  declarations: [ListarUsuarioPage, SearchPipe]
})
export class ListarUsuarioPageModule {}
