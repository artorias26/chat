import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

    usuario: any = {};

    constructor(
        private navController: NavController
    ) { }

    ngOnInit() {
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }

    listarUsuario() {
      this.navController.navigateRoot('/listar-usuario');
    }


    salir() {
        localStorage.clear();
        this.navController.navigateRoot('/login');
    }
}
