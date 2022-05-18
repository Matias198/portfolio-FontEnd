import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  url="https://porfolio-matias-fernandez.herokuapp.com/";
  currentUserSubject:BehaviorSubject<any>;

  constructor(private http:HttpClient) { 
    console.log("El servicio de autenticacion esta corriendo");
    this.currentUserSubject=new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'));
  }

  IniciarSesion(credenciales:any):Observable<any>{
    return this.http.post(this.url, credenciales).pipe(map(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }));
  }

  CrearUsuario(credenciales:any):Observable<any>{
    this.url = this.url + "registrar-usuario";
    console.log(this.url.toString());
    console.log(JSON.stringify(credenciales));
    return this.http.post(this.url, credenciales).pipe(map(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }));
  }

  get usuarioAutenticado(){
    return this.currentUserSubject.value;
  }
}
