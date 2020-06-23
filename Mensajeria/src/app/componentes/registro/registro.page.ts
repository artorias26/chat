import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController  } from '@ionic/angular';
import { LoginService } from '../../services';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email='';
  clave='';
  confirClave='';

  constructor(
    private loginService: LoginService,
    private navController: NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  btnRuta() {

    if(this.email !=='' && this.clave == '' && this.confirClave == '' ){
      this.alertError();
    }

    if(this.email == ''  && this.clave !=='' && this.confirClave == '' ){
      this.alertError();
    }

    if(this.email !==''  && this.clave !=='' && this.confirClave !=='' ){
      this.alertError();
    }

    if(this.email =='' && this.clave == '' && this.confirClave == '' ){
      this.navController.navigateRoot('/login');
    }

  }

  async registro(){
    if(this.email =='' && this.clave == '' && this.confirClave == '' ){
      this.toatError('Error, Por favor Ingrese los datos en los campos');
    }

    if(this.email =='' && this.clave !=='' && this.confirClave !== '' ){
      this.toatError('Error, Por favor Ingrese el correo.');
      return;
    }

    if(this.email !=='' && this.clave == '' && this.confirClave == '' ){
      this.toatError('Error Por favor Ingrese la Contraseña.');
      return;
    }

    if(this.email == ''  && this.clave !=='' && this.confirClave == '' ){
      this.toatError('Error, Por favor Ingrese el Correo.');
      return;
    }

    if(this.email == ''  && this.clave =='' && this.confirClave !== '' ){
      this.toatError('Error, Por favor Ingrese el Correo y la contraseña');
      return;
    }

    if(this.email !=='' && this.clave !=='' && this.confirClave == '' ){
      this.toatError('Error, Por favor Ingrese la confirmacion de la contraseña.');
      return;
    }

    if(this.email == ''  && this.clave !=='' && this.confirClave !== '' ){
      this.toatError('Error, Por favor Ingrese el Correo');
      return;
    }

    if(this.email !== ''  && this.clave =='' && this.confirClave !== '' ){
      this.toatError('Error, Por favor Ingrese la contraseña');
      return;
    }

    if(this.email !=='' && this.clave !=='' && this.confirClave !== this.clave ){
      this.toatError('Error, La contraseña y la confirmación no son iguales');
      return;
    }

    if(this.email !=='' && this.clave !=='' && this.confirClave == this.clave ) {
      const loader = await this.presentLoading();
      loader.present();
      const formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.clave);

      this.loginService.registrar(formData).subscribe((resp: any) => {
        if (resp.data) {
          localStorage.setItem('usuario', JSON.stringify(resp.data));
          this.navController.navigateRoot('/inicio');
        } else {
          this.alertRegistro();
        }

        loader.dismiss();
      });
    }
  }

  async alertError() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Esta Seguro?',
      message: 'Si sale perdera<strong> todos los datos escrito.</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Salir',
          handler: () => {
            this.navController.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  async alertRegistro() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Hubo un error al registrar el usuario, por favor intente más tarde.',
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
