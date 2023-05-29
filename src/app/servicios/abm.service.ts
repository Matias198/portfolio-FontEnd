import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AbmService {
  //url = 'https://porfolio-matias-fernandez.herokuapp.com/';
  url = 'https://portfolio-backend-production-0074.up.railway.app/'
  
  constructor(private http: HttpClient) {
    console.log('El servicio de ABM esta corriendo');
  }

  Baja(clase: string, id: any): Observable<any> {
    const newUrl = this.url + 'borrar-' + clase + '/' + id;
    return this.http.delete(newUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }

  Modificacion(
    credenciales: any,
    clase: string,
    id: any,
    dni: any
  ): Observable<any> {
    const newUrl = this.url + 'modificar-' + clase + '/' + id + '/' + dni;
    return this.http.put(newUrl, credenciales).pipe(
      map((data) => {
        return data;
      })
    );
  }

  Alta(credenciales: any, clase: string, dni: any): Observable<any> {
    const newUrl = this.url + 'crear-' + clase + '/?dni=' + dni;
    return this.http.post(newUrl, credenciales).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
