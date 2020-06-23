import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { UsuarioService } from '../../services';

@Component({
    selector: 'app-editar-usuario',
    templateUrl: './editar-usuario.page.html',
    styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

    data: any = {};

    constructor(
        private usuarioService: UsuarioService,
        private alertController: AlertController,
        private toastController: ToastController,
        private loadingController: LoadingController
    ) { }

    ngOnInit() {
        this.data = JSON.parse(localStorage.getItem('usuario'));
    }

    async actualizar() {
        const loader = await this.presentLoading();
        loader.present();

        const formData = new FormData();
        formData.append('nombre', this.data.nombre);
        formData.append('apellido', this.data.apellido);
        formData.append('correo', this.data.correo);
        formData.append('clave', this.data.clave);

        this.usuarioService.update(this.data.id, formData).subscribe((resp: any) => {
            if (resp.data) {
                localStorage.setItem('usuario', JSON.stringify(resp.data));
                this.alert();
            } else {
                this.toatError('Error, hubo un error al actualizar los datos de la cuenta');
            }

            loader.dismiss();
        });
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: ''
        });
        return loading;
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

    async alert() {
        const alert = await this.alertController.create({
          header: 'Actualizado',
          message: 'La cuenta fue actualizado correctamente',
          buttons: ['OK']
        });
        await alert.present();
    }

}
