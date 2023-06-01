import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css'],
})
export class EncabezadoComponent implements OnInit { 
  @Input()usuario:any;
  constructor( private ruta: Router) {}
 
  ngOnInit(): void {
    console.log(this.usuario)
  }
 
  onCerrarSesion(event: Event){
    event.preventDefault;
    console.log('redireccionando al login') 
    this.ruta.navigate(['iniciar-sesion']);
  }
}
