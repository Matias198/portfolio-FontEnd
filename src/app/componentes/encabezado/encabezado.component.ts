import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/servicios/autentication.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css'],
})
export class EncabezadoComponent implements OnInit { 
  @Input()usuario:any;
  usuarioJson:any
  constructor( private ruta: Router, private autenticationService: AutenticationService) {}
 
  ngOnInit(): void { 
    this.usuarioJson = this.autenticationService.usuarioAutenticado
  }
 
  onCerrarSesion(event: Event){
    event.preventDefault;
    console.log('redireccionando al login') 
    this.ruta.navigate(['iniciar-sesion']);
  }
}
