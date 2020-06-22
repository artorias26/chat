import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
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
    private toastController: ToastController
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

  registro(){
    
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

    if(this.email !=='' && this.clave !=='' && this.confirClave == this.clave ){
      this.toatError('Error');
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

  async toatError(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

 
}
