import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UsuarioService, Global } from '../../services';
import { environment } from '../../../environments/environment';
import * as introJs from '../../../assets/js/intro.js';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

    usuario: any = {};
    foto: any;
    url: any;

    constructor(
        private navController: NavController,
        private router: Router,
        private alertController: AlertController,
        private usuarioService: UsuarioService,
        private toastController: ToastController,
        private loadingController: LoadingController,
        private global: Global,
        private domSanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.url = environment.apiUrl;
        this.usuario = this.global.getLocalStorage('usuario');
        this.textGuia();
    }

    ionViewWillEnter() {
        this.usuario = this.global.getLocalStorage('usuario');
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

    imprimirReporte() {
        window.open(`${environment.apiUrl}/api/reporte/listar usuario.php`, '_blank');
    }

    async fotoPerfil() {
        const input=document.createElement('input');
        input.type="file";

        setTimeout(() => {
            input.click();

            input.addEventListener('change', async (event) => {
                const loader = await this.global.loader();
                loader.present();
                const reader: any = new FileReader();
                if (input.files && input.files.length > 0) {
                    const file = input.files[0];
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        this.foto = reader.result.split(',')[1];
                        // this.usuario.foto = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + reader.result.split(',')[1]);
                        
                        const formData = new FormData();
                        formData.append('id', this.usuario.id);
                        formData.append('photo', this.foto);
                        this.usuarioService.photoProfile(formData).subscribe((resp: any) => {
                            this.global.setLocalStorage('usuario', resp.data);
                            this.usuario = this.global.getLocalStorage('usuario');
                            loader.dismiss();
                        }, (error: any) => {
                            console.log('Error al subir la foto de perfil', error);
                            loader.dismiss();
                        });
                    };
                }

            });
        }, 1000);
    }

    textGuia(option = introJs()) {
        const isProfile = this.global.getLocalStorage('isProfile');
        if (isProfile) {
            return;
        }
        option.setOptions({
            nextLabel: 'Siguiente',
            prevLabel: 'Atras',
            skipLabel: 'Salir',
            doneLabel: 'Finalizar',
            steps: [{
                element: '#foto',
                intro: 'Hacer click en la imagen para agregar o actualizar foto de perfil',
                position: 'top'
            }, {
                element: '#editar',
                intro: 'Aquí podras actualizar tus datos del perfil',
                position: 'top'
            },{
                element: '#lista',
                intro: 'Aquí podras eliminar los usuarios registrados',
                position: 'top'
            },{
                element: '#imprimir',
                intro: 'Aquí podras imprimir el reporte de todos los usuarios registrados',
                position: 'top'
            }]
        });
        setTimeout(() => {
            if (this.router.url == '/inicio/perfil') {
                const setting = option.start();
                setting._options.skipTooltipButton.addEventListener('click', () => {
                    // this.global.setLocalStorage('isProfile', true);
                }, false);
            }
        }, 1500);
    }
}
