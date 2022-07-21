import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticationService } from './autentication.service';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate {
  constructor(
    private autenticationService: AutenticationService,
    private rutas: Router
  ) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let currentUser = this.autenticationService.usuarioAutenticado;
    if (currentUser && currentUser.token) {
      return true;
    } else {
      this.rutas.navigate(['iniciar-sesion']);
      return false;
    }
  }
}
