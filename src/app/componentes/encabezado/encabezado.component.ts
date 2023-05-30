import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css'],
})
export class EncabezadoComponent implements OnInit {
  nombres: any;
  apellido: any;
  form: FormGroup;
  usuarioJson:any;
  constructor(
    private formBuilder: FormBuilder,
    private datosPorfolio: PorfolioService,
    private ruta: Router
  ) {
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.usuarioJson = JSON.parse(sessionStorage.getItem('currentUser')||'{}');
  }

  get dni() {
    return this.form.get('dni');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe((data) => {
      const obj = JSON.parse(JSON.stringify(data));
      this.nombres = obj.nombres;
      this.apellido = obj.apellido;
    });
  }

  onCerrarSesion(event: Event){
    event.preventDefault;
    console.log('redireccionando al login') 
    this.ruta.navigate(['iniciar-sesion']);
  }

}
