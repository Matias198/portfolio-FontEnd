import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  //url="https://porfolio-matias-fernandez.herokuapp.com/";
  //url="https://porfolio-matias-fernandez.herokuapp.com/registrar-usuario";
  url = "http://localhost:8080/"
  currentUserSubject:BehaviorSubject<any>;
  public variable:any

  constructor(private http:HttpClient) { 
    console.log("El servicio de autenticacion esta corriendo");
    this.currentUserSubject=new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'));
    
  }

  IniciarSesion(credenciales:any): Observable<any>{
    const urlAux = this.url + 'iniciar-sesion?id=' + credenciales.id_usuario
    return this.http.get(urlAux, credenciales && {responseType: 'json'}).pipe(map(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(data))
      console.log("(IniciarSesion) DATA: ", JSON.stringify(data))
      this.currentUserSubject.next(data)
      return data;
    }))

    
    /*
    this.http.request
    return this.http.get(this.url + 'iniciar-sesion?id=' + credenciales.id_usuario, credenciales).pipe(map(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(data))
      console.log("(IniciarSesion) DATA: ", JSON.stringify(data))
      this.currentUserSubject.next(data)
      return data;
    }))*/
  }


  get usuarioAutenticado(){
    return this.currentUserSubject.value
  }
}
