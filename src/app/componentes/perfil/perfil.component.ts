import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbmService } from 'src/app/servicios/abm.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  miPorfolio: any;
  usuarioJson: any;
  form: FormGroup;
  acercaDeList: any;
  id: number;
  t: string;

  constructor(
    private datosPorfolio: PorfolioService,
    private formBuilder: FormBuilder,
    private abmService: AbmService
  ) {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.usuarioJson = JSON.parse(
      sessionStorage.getItem('currentUser') || '{}'
    );
    this.id = 0;
    this.t = '';
  }

  get titulo() {
    return this.form.get('titulo');
  }

  get descripcion() {
    return this.form.get('descripcion');
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe((data) => {
      const obj = JSON.parse(JSON.stringify(data));
      this.miPorfolio = obj;
      const array = obj.secciones;
      array.sort((a: any, b: any) => a.idSeccion - b.idSeccion);
      this.acercaDeList = array;
    });
  }

  onNuevo(event: Event) {
    event.preventDefault;
    this.form.reset;
    const elemento = document.querySelector('.acercade_nuevo');
    elemento?.classList.add('modal--show');
  }

  onEnviarNuevo(event: Event) {
    event.preventDefault;
    let credenciales = this.form.value;
    let usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.abmService
      .Alta(credenciales, 'seccion', usuarioJson.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          const obj = JSON.parse(JSON.stringify(data));
          const array = obj.secciones;
          array.sort((a: any, b: any) => a.idSeccion - b.idSeccion);
          this.acercaDeList = array;
        });
        this.form.reset;
        console.log(data2);
        this.onClose(event);
      });
  }

  onClose(event: Event) {
    event.preventDefault;
    this.id = 0;
    this.t = '';
    let elemento = document.querySelector('.acercade_edit');
    elemento?.classList.remove('modal--show');
    elemento = document.querySelector('.acercade_delete');
    elemento?.classList.remove('modal--show');
    elemento = document.querySelector('.acercade_nuevo');
    elemento?.classList.remove('modal--show');
  }

  onEdit(acercade: any) {
    this.id = acercade.idSeccion;
    this.t = acercade.titulo;
    this.form.controls['titulo'].setValue(acercade.titulo);
    this.form.controls['descripcion'].setValue(acercade.descripcion);
    const elemento = document.querySelector('.acercade_edit');
    elemento?.classList.add('modal--show');
  }

  onEliminar(acercade: any) {
    this.id = acercade.idSeccion;
    this.t = acercade.titulo;
    const elemento = document.querySelector('.acercade_delete');
    elemento?.classList.add('modal--show');
  }

  onEnviar(event: Event) {
    event.preventDefault;
    let credenciales = this.form.value;
    let usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.abmService
      .Modificacion(credenciales, 'seccion', this.id, usuarioJson.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          const obj = JSON.parse(JSON.stringify(data));
          const array = obj.secciones;
          array.sort((a: any, b: any) => a.idSeccion - b.idSeccion);
          this.acercaDeList = array;
        });
        this.form.reset;
        console.log(data2);
        this.onClose(event);
      });
  }

  onDelete(event: Event) {
    event.preventDefault;
    this.abmService.Baja('seccion', this.id).subscribe((data) => {
      console.log(data);
      this.datosPorfolio.obtenerDatos().subscribe((data) => {
        const obj = JSON.parse(JSON.stringify(data));
        const array = obj.secciones;
        array.sort((a: any, b: any) => a.idSeccion - b.idSeccion);
        this.acercaDeList = array;
      });
      this.form.reset;
      this.onClose(event);
    });
  }
}
