import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from '../../services';

@Component({
  selector: 'app-reciente',
  templateUrl: './reciente.page.html',
  styleUrls: ['./reciente.page.scss'],
})
export class RecientePage implements OnInit {

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
