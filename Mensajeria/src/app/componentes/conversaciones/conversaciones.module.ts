import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversacionesPageRoutingModule } from './conversaciones-routing.module';

import { ConversacionesPage } from './conversaciones.page';

import {AutosizeModule} from 'ngx-autosize';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversacionesPageRoutingModule,
    AutosizeModule
  ],
  declarations: [ConversacionesPage]
})
export class ConversacionesPageModule {}
