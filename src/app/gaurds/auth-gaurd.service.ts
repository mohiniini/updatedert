import { Injectable } from '@angular/core';
import {CanActivate,Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  canActivate() {
    if(localStorage.userid){
      return true;
    }else{
       this.routes.navigate(['login'])
      return false;
    }
  }

  constructor(private routes:Router) { }
}
