import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formulario: FormGroup;
  loading;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formulario = this.fb.group({
      name: [null],
      email: [null],
      password: [null],
    })
  }

  async onRegister(email: any, password: any) {
    try {
      this.presentLoading('Registrando...');
      const user = await this.authService.register(email.value, password.value);
      this.loading.dismiss();
      if (user) {
        console.log('User =>', user);
      }
    } catch (error) {
      console.error('Error =>', error);
    }
  }

  get f() {
    return this.formulario.controls;
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      message: mensaje
    });
    await this.loading.present();
  }
}
