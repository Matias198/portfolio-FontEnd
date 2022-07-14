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
  constructor(private http:HttpClient, private autenticationService:AutenticationService) { }

  obtenerDatos():Observable<any> {
    var usuarioJson = JSON.parse(sessionStorage.getItem('currentUser')||'{}');
    return this.http.get(this.url + 'portfolio?dni=' + usuarioJson.dni);
  }
}
