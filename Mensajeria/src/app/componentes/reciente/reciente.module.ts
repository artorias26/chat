import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPipe } from '../../pipe/search.pipe';
import { RecientePageRoutingModule } from './reciente-routing.module';

import { RecientePage } from './reciente.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RecientePageRoutingModule
    ],
    declarations: [
        RecientePage, 
        SearchPipe
    ]
})
export class RecientePageModule {}
