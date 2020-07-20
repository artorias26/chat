import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UsuarioService, ChatService } from '../../services';

@Component({
  selector: 'app-reciente',
  templateUrl: './reciente.page.html',
  styleUrls: ['./reciente.page.scss'],
})
export class RecientePage implements OnInit {

    usuarioLista = [];
    searchText = '';
    usuario: any = {id: ''};
    url: any;

    constructor(
        private usuarioService: UsuarioService,
        private chatService: ChatService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.url = environment.apiUrl;
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }

    ionViewWillEnter() {
        this.getList();
    }

    getList() {
        const formData = new FormData();
        formData.append('idUsuario', this.usuario.id);
        this.chatService.mensajeReciente(formData).subscribe((resp: any) => {
            this.usuarioLista = resp.data;
        }, (error: any) => {
            console.log('Error al mostrar lista de conversaciones recientes', error);
        });
    }

    search(event) {
        this.searchText = event.srcElement.value
    }

    crearConversacion(data) {
        localStorage['idSala'] = data.idSala;
        this.router.navigate(['/conversaciones']);
    }
}
