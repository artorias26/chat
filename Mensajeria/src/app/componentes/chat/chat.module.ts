import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPipe } from '../../pipe/search.pipe';
import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChatPageRoutingModule
    ],
    declarations: [
        ChatPage,
        SearchPipe
    ]
})
export class ChatPageModule {}
