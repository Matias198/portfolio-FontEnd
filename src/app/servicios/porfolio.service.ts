import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PorfolioService {
  url = 'https://porfolio-matias-fernandez.herokuapp.com/';

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    var usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    return this.http.get(this.url + 'portfolio?dni=' + usuarioJson.dni);
  }
}
