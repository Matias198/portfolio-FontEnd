import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticationService } from './autentication.service';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {
  //url="https://porfolio-matias-fernandez.herokuapp.com/";
  url = "http://localhost:8080/"
  dni = 41419890;
  constructor(private http:HttpClient, private autenticationService:AutenticationService) { }

  obtenerDatos():Observable<any> {
    //console.log(this.autenticationService.usuarioAutenticado.getItem("dni"))
    return this.http.get(this.url + 'portfolio?dni=' + this.dni);
  }
}
