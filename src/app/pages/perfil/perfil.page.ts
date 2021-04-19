import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  listas: any[] = [
    { id: 1, valor: 1000, tipoCuenta: 'Ahorros', transferir: false, depositar: false },
    { id: 2, valor: 2000, tipoCuenta: 'Corriente', transferir: false, depositar: false },
    { id: 3, valor: 3000, tipoCuenta: 'Ahorros', transferir: false, depositar: false },
    { id: 4, valor: 4000, tipoCuenta: 'Corriente', transferir: false, depositar: false },
    { id: 5, valor: 5000, tipoCuenta: 'Corriente', transferir: false, depositar: false },
  ];
  transferir = false;
  constructor(private router: Router, private toastController: ToastController) {

  }

  ngOnInit() { }

  click() {
    console.log('click');
  }

  verDepositar(cuenta: any) {
    if (cuenta.depositar === true) {
      cuenta.depositar = false;
    } else {
      cuenta.depositar = true;
    }
  }


  verTransferir(cuenta: any) {
    if (cuenta.transferir === true) {
      cuenta.transferir = false;
    } else {
      cuenta.transferir = true;
    }
  }

  depositarDinero(dinero: any, cuenta: any) {
    cuenta.valor = cuenta.valor + Number(dinero.value);
    cuenta.depositar = false;
  }

  transferirDinero(dinero: any, numero_cuenta, mi_cuenta: any) {
    let cuentaSeleccionada = null;
    if (Number(numero_cuenta.value) === mi_cuenta.id) {
      this.mostrarMensaje('No se puede transferir a la misma cuenta.');
    } else {
      this.listas.forEach(cuenta => {
        if (cuenta.id === Number(numero_cuenta.value)) {
          cuentaSeleccionada = cuenta;
        }
      });

      if (cuentaSeleccionada !== null) {
        if (mi_cuenta.valor < Number(dinero.value)) {
          this.mostrarMensaje('No tienes suficiente dinero para la transacción');
        } else {
          mi_cuenta.valor = mi_cuenta.valor - Number(dinero.value);
          cuentaSeleccionada.valor = cuentaSeleccionada.valor + Number(dinero.value);
          mi_cuenta.transferir = false;
        }
      } else {
        this.mostrarMensaje('Numero de cuenta no registrada.');
      }

    }
  }

  logout() {
    this.router.navigate(['login']);
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: 'primary',
      duration: 5000
    });
    toast.present();
  }
}
