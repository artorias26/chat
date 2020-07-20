import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Global {

    constructor(
        private loadingController: LoadingController,
        private toastController: ToastController,
        private alertController: AlertController
    ) {}

    getLocalStorage(key) {
        if (localStorage[key]) {
            return  JSON.parse(localStorage[key]);
        } else {
            return null;
        }
    }

    setLocalStorage(key, data) {
        localStorage[key] = JSON.stringify(data);
    }

    async loader() {
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

    async alertError(titulo, mensaje) {
        const alert = await this.alertController.create({
            header: titulo,
            message: mensaje,
            buttons: ['OK']
        });

        await alert.present();
    }
}