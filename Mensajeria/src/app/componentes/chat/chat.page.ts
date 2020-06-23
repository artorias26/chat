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
    usuario: any = {id: ''};

    constructor(
        private usuarioService: UsuarioService
    ) {
    }

    ngOnInit() {
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.getList(this.usuario);
    }

    getList(data) {
        this.usuarioService.getSelect(data.id).subscribe((resp: any) => {
            this.usuarioLista = resp.data;
        });
    }

    search(event) {
        this.searchText = event.srcElement.value;
    }

}
