import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from '../../services';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.page.html',
  styleUrls: ['./listar-usuario.page.scss'],
})
export class ListarUsuarioPage implements OnInit {

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
        this.searchText = event.srcElement.value
    }

}
