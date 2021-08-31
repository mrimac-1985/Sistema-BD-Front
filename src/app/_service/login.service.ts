import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  
  estaLogueado() {
    let token = sessionStorage.getItem("login");
    return token != null;
  }


  
  cerrarSesion(nidSesion : number) {
  
  
  }



}
