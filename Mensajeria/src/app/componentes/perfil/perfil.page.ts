import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

    usuario: any = {};

    constructor(
        private navController: NavController,
        private router: Router,
        private alertController: AlertController,
        private usuarioService: UsuarioService,
        private toastController: ToastController,
        private loadingController: LoadingController
    ) { }

    ngOnInit() {
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }

    ionViewWillEnter() {
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }

    listarUsuario() {
        this.router.navigate(['/listar-usuario']);
    }

    editar() {
        this.router.navigate(['/editar-usuario']);
    }

    salir() {
        localStorage.clear();
        this.navController.navigateRoot('/login');
    }

    async eliminar() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Eliminar cuenta',
            message: '¿Estas seguro de eliminar tu cuenta?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                    }
                }, {
                    text: 'Si',
                    handler: async () => {
                        const loader = await this.presentLoading();
                        loader.present();
                        this.usuarioService.remove(this.usuario.id).subscribe((resp: any) => {
                            if (resp.data) {
                                this.salir();
                            } else {
                                this.toatError('Error, Hubo un error al eliminar la cuenta');
                            }
                            loader.dismiss();
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    async toatError(mensaje) {
        const toast = await this.toastController.create({
            message: mensaje,
            duration: 2000,
            color: 'danger',
            position: 'top'
        });
        toast.present();
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: ''
        });
        return loading;
    }
}
