import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UsuarioService, ChatService, Global } from '../../services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {


    usuarioLista = [];
    searchText = '';
    usuario: any = {id: ''};
    url: any;

    constructor(
        private usuarioService: UsuarioService,
        private router: Router,
        private chatService: ChatService,
        private global: Global
    ) {
    }

    ngOnInit() {
        this.url = environment.apiUrl;
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }

    ionViewWillEnter() {
        this.getList(this.usuario);
    }

    getList(data) {
        this.usuarioService.getSelect(data.id).subscribe((resp: any) => {
            if (resp.data.length > 0) {
                this.usuarioLista = resp.data;
            } else {
                this.global.alertError('Error', 'No existe usuarios registrados');
            }
            
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
            localStorage['idSala'] = resp.data.idSala;
            this.router.navigate(['/conversaciones']);
        }, (error: any) => {
            console.log('Error al activar la conversación', error);
        });
    }

}
