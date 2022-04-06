import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor() { }

  canActivate() {
    const tipoUsuario = localStorage.getItem("user-type");
    if (tipoUsuario){
      return true;  
    }
    return false;
  }
}