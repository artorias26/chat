import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { UsuarioService } from '../../services';

@Component({
    selector: 'app-listar-usuario',
    templateUrl: './listar-usuario.page.html',
    styleUrls: ['./listar-usuario.page.scss'],
})
export class ListarUsuarioPage implements OnInit {

    usuarioLista = [];
    searchText = '';
    usuario: any = { id: '' };

    constructor(
        private usuarioService: UsuarioService,
        private alertController: AlertController,
        private toastController: ToastController,
        private loadingController: LoadingController
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

    async remove(data) {
        const loader = await this.presentLoading();
        loader.present();
        this.usuarioService.remove(data.id).subscribe((resp: any) => {
            console.log(resp);
            if (resp.data) {
                this.alert();
                this.getList(this.usuario);
            } else {
                this.toatError('Error, Hubo un error al eliminar el usaurio');
            }

            loader.dismiss();
        });
    }

    async alert() {
        const alert = await this.alertController.create({
          header: 'Eliminado',
          message: 'El usuario fue eliminado correctamente',
          buttons: ['OK']
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
