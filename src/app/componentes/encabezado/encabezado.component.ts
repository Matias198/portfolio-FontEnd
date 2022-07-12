import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/servicios/autentication.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css'],
})
export class EncabezadoComponent implements OnInit {
  nombres: any;
  apellido: any;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private datosPorfolio: PorfolioService,
    private ruta: Router,
    private autenticationService:AutenticationService
  ) {
    this.form = this.formBuilder.group({
      id_usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get id_usuario(){
    return this.form.get('id_usuario')
  }

  get password(){
    return this.form.get('password')
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe((data) => {
      const obj = JSON.parse(JSON.stringify(data));
      this.nombres = obj.nombres;
      this.apellido = obj.apellido;
    });
  }

  onClick(event: Event) {
    event.preventDefault;
    const elemento = document.querySelector('.modal_top')
    elemento?.classList.add('modal--show')
    //this.ruta.navigate(['iniciar-sesion']);
  }

  onClose(event: Event) {
    event.preventDefault;
    const elemento = document.querySelector('.modal_top')
    elemento?.classList.remove('modal--show')
  }

  onEnviar(event:Event){
    event.preventDefault;
    console.log("DATA: " + JSON.stringify(this.form.value))
    this.autenticationService.IniciarSesion(this.form.value).subscribe(data => {
      console.log("(onEnviar) DATA:" + JSON.stringify(data))
      this.ruta.navigate(["portfolio"])
    })
  }
}
