import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { LoginService } from '../../services';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  email = '';


  constructor(
    private loginService: LoginService,
    private navController: NavController,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }


  
  ngOnInit() {
    
  }

  btnRecuperar(){
    if(this.email == ''){
      this.toatError('Error, Ingresar correo');
      return;
    }

    const formData = new FormData();
    formData.append('email', this.email);

    this.loginService.recuperar(formData).subscribe((resp: any) => {
      if (resp.data) {
        const mensaje ="Tu contraseña fué recuperado. Tu clave es: "+ resp.data.clave;
        this.alertError(mensaje);
      }else{
        this.toatError('Error, El correo no esta registrado');
      }
    });

  }

  async alertError( mensaje) {
    const alert = await this.alertController.create({
      header: 'Recuperación',
      message:mensaje,
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

  btnRuta() {
      this.navController.navigateRoot('/login');

  }

}
