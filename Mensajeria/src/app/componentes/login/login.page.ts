import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { LoginService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  clave = '';

  constructor(
    private loginService: LoginService,
    private navController: NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async btnLogin() {
    if (this.email == '' && this.clave == '') {
      this.toatError('Error, ingresar correo y contraseña');
      return;
    }

    if (this.email == '') {
      this.toatError('Error, ingresar correo');
      return;
    }

    if (this.clave == '') {
      this.toatError('Error, ingresar contraseña');
      return;
    }

    const loader = await this.presentLoading();
    loader.present();
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.clave);

    this.loginService.login(formData).subscribe((resp: any) => {
      if (resp.data.id) {
        localStorage.setItem('usuario', JSON.stringify(resp.data));
        this.navController.navigateRoot('/inicio');
      } else {
        this.alertError();
        this.email = '';
        this.clave = '';
      }

      loader.dismiss();
    });
  }

  async alertError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Correo o contraseña invalida, por favor vuelva a intentar',
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

  btnRuta(value) {
    if (value) {
      this.navController.navigateRoot('/registro');
    } else {
      this.navController.navigateRoot('/recuperar');
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: ''
    });
    return loading;
  }

}
