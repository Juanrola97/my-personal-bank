import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading;

  constructor(private authService: AuthService, private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
  }

  async onLogin(email: any, password: any) {
    try {
      if(email && email.value && password&& password.value) {
        this.presentLoading('Ingresando...');
        const user = await this.authService.login(email.value, password.value);
        if (user) {
          await this.loading.dismiss();
          this.router.navigate(['/perfil']);
          console.error('USER =>', user);
        } else {
          await this.loading.dismiss();
        }
      }
    } catch (error) {
      console.error('Error =>', error);
      await this.loading.dismiss();
    }
  }

  async onLoginGoogle() {
    try {
      this.presentLoading('Ingresando...');
      const user = await this.authService.loginGoogle();
      if (user) {
        await this.loading.dismiss();
        this.router.navigate(['/perfil']);
      }else {
        await this.loading.dismiss();
      }
    } catch (error) {
      await this.loading.dismiss();
      console.error('Error =>', error);
    }
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      message: mensaje
    });
    await this.loading.present();
  }

}
