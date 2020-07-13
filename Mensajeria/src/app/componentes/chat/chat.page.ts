import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService, ChatService } from '../../services';

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
        private usuarioService: UsuarioService,
        private router: Router,
        private chatService: ChatService
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

    crearConversacion(data) {
        const formData = new FormData();
        formData.append('idUsuario', this.usuario.id);
        formData.append('idContacto', data.id);
        formData.append('tipoSala', '1');

        this.chatService.registrarChat(formData).subscribe((resp: any) => {
            console.log('aqui', resp);
            this.router.navigate(['/conversaciones']);
        }, (error: any) => {
            console.log('Error al activar la conversación', error);
        });
    }

}
