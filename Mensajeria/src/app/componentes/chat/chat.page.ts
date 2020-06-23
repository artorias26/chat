import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from '../../services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {


    usuarioLista = [];
    searchText = '';

    constructor(
        private usuarioService: UsuarioService
    ) {
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        this.usuarioService.getSelect().subscribe((resp: any) => {
            this.usuarioLista = resp.data;
        });
    }

    search(event) {
        this.searchText = event.srcElement.value
    }

}
