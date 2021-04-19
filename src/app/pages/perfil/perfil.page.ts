import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  listas: any[] = [1, 2, 3, 4, 5];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  click() {
    console.log("click")
  }

  logout(){
    this.router.navigate(['login'])
  }
}
