import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  acercaDeList:any;
  form: FormGroup;
  url = "http://localhost:8080/"
  constructor(private datosPorfolio:PorfolioService, private formBuilder: FormBuilder,) { 
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required], Validators.maxLength(255)],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  get titulo(){
    return this.form.get('titulo')
  }

  get descripcion(){
    return this.form.get('descripcion')
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe(data =>{
      const obj = JSON.parse(JSON.stringify(data))
      this.acercaDeList = obj.secciones;
    })
  }

  onClick(event: Event) {
    event.preventDefault;
    const elemento = document.querySelector('.modal_top')
    elemento?.classList.add('modal--show')
  }

  onClose(event: Event) {
    event.preventDefault;
    const elemento = document.querySelector('.modal_top')
    elemento?.classList.remove('modal--show')
  }
  onEnviar(event:Event){
    event.preventDefault;
    let urlAux = this.url + "/crear-seccion"
  }

  onEdit(event:Event, id:any){
    event.preventDefault;
    alert("HOLA SOY EL: " + id)
  }
}
