import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/servicios/autentication.service';
import { stringify } from '@angular/compiler/src/util';

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
    private ruta: Router,
    private autenticationService: AutenticationService
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
    window.sessionStorage.clear();
    this.ruta.navigate(['iniciar-sesion']);
  }

  onClick(event: Event) {
    event.preventDefault;
    const elemento = document.querySelector('.modal_top');
    elemento?.classList.add('modal--show');
    //this.ruta.navigate(['iniciar-sesion']);
  }

  onClose(event: Event) {
    event.preventDefault;
    const elemento = document.querySelector('.modal_top');
    elemento?.classList.remove('modal--show');
  }

  onEnviar(event: Event) {
    event.preventDefault;
    this.autenticationService
      .IniciarSesion(this.form.value)
      .subscribe((data) => {
        console.log(data);
        this.ruta.navigate(['portfolio']);
        const elemento = document.querySelector('.modal_top');
        elemento?.classList.remove('modal--show');
      });
  }
}
