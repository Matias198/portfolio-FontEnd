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
  formPerfil: FormGroup;
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
    this.formPerfil = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      mail: ['', Validators.required],
      ocupacion: ['', Validators.required],
      image_background: ['', Validators.required],
      image_perfil: ['', Validators.required]
    })
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

  get nombres() {
    return this.form.get('nombres');
  }
  get apellido() {
    return this.form.get('apellido');
  }
  get fecha_nacimiento() {
    return this.form.get('fecha_nacimiento');
  }
  get nacionalidad() {
    return this.form.get('nacionalidad');
  }
  get mail() {
    return this.form.get('mail');
  }
  get ocupacion() {
    return this.form.get('ocupacion');
  }
  get image_background() {
    return this.form.get('image_background');
  }
  get image_perfil() {
    return this.form.get('image_perfil');
  }

  onEnviarPerfil(event: Event){
    event.preventDefault;
    let credenciales = this.formPerfil.value;
    let usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.abmService
      .Modificacion(credenciales, 'persona', 1, usuarioJson.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          const obj = JSON.parse(JSON.stringify(data));
          this.miPorfolio = obj;
        });
        this.formPerfil.reset;
        console.log(data2);
        this.onClose(event);
      });
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

  onEditarPerfil(event: Event) {
    event.preventDefault;
    this.formPerfil.reset;
    this.formPerfil.controls['nombres'].setValue(this.miPorfolio.nombres);
    this.formPerfil.controls['apellido'].setValue(this.miPorfolio.apellido);
    this.formPerfil.controls['fecha_nacimiento'].setValue(this.miPorfolio.fecha_nacimiento);
    this.formPerfil.controls['nacionalidad'].setValue(this.miPorfolio.nacionalidad);
    this.formPerfil.controls['mail'].setValue(this.miPorfolio.mail);
    this.formPerfil.controls['ocupacion'].setValue(this.miPorfolio.ocupacion);
    this.formPerfil.controls['image_background'].setValue(this.miPorfolio.image_background);
    this.formPerfil.controls['image_perfil'].setValue(this.miPorfolio.image_perfil);
    const elemento = document.querySelector('.perfil_edit');
    elemento?.classList.add('modal--show');
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
    elemento = document.querySelector('.perfil_edit');
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
