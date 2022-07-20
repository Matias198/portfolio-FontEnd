import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbmService } from 'src/app/servicios/abm.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  educationList: any;
  experienceList: any;
  usuarioJson: any;
  formExp: FormGroup;
  formAca: FormGroup;
  id: number;
  ida: number;
  t: string;
  ta: string;
  url = 'http://localhost:8080/';

  constructor(
    private datosPorfolio: PorfolioService,
    private formBuilder: FormBuilder,
    private abmService: AbmService
  ) {
    this.formExp = this.formBuilder.group({
      titulo: ['', Validators.required],
      establecimiento: ['', Validators.required],
      lugar: ['', Validators.required],
      desde: ['', Validators.required],
      hasta: ['', Validators.required],
      duracion: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      pais: ['', Validators.required],
      imagen: ['', Validators.required],
    });

    this.formAca = this.formBuilder.group({
      titulo: ['', Validators.required],
      carrera: ['', Validators.required],
      escuela: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      puntaje: ['', Validators.required],
      imagen: ['', Validators.required],
    });

    this.usuarioJson = JSON.parse(
      sessionStorage.getItem('currentUser') || '{}'
    );
    this.id = 0;
    this.t = '';
    this.ida = 0;
    this.ta = '';
  }

  get tituloExp() {
    return this.formExp.get('titulo');
  }
  get establecimientoExp() {
    return this.formExp.get('establecimiento');
  }
  get lugarExp() {
    return this.formExp.get('lugar');
  }
  get desdeExp() {
    return this.formExp.get('desde');
  }
  get hastaExp() {
    return this.formExp.get('hasta');
  }
  get duracionExp() {
    return this.formExp.get('duracion');
  }
  get ciudadExp() {
    return this.formExp.get('ciudad');
  }
  get provinciaExp() {
    return this.formExp.get('provincia');
  }
  get paisExp() {
    return this.formExp.get('pais');
  }
  get imagenExp() {
    return this.formExp.get('imagen');
  }
  get tituloAcademico() {
    return this.formAca.get('titulo');
  }
  get carreraAcademico() {
    return this.formAca.get('carrera');
  }
  get escuelaAcademico() {
    return this.formAca.get('escuela');
  }
  get inicioAcademico() {
    return this.formAca.get('inicio');
  }
  get finAcademico() {
    return this.formAca.get('fin');
  }
  get puntajeAcademico() {
    return this.formAca.get('puntajeo');
  }
  get imagenAcademico() {
    return this.formAca.get('imagen');
  }

  onClose(event: Event) {
    event.preventDefault;
    this.id = 0;
    this.ida = 0;
    this.t = '';
    this.ta = '';
    let elemento = document.querySelector('.exp_edit');
    elemento?.classList.remove('modal--show');
    elemento = document.querySelector('.exp_delete');
    elemento?.classList.remove('modal--show');
    elemento = document.querySelector('.exp_nueva');
    elemento?.classList.remove('modal--show');
    elemento = document.querySelector('.aca_edit');
    elemento?.classList.remove('modal--show');
    elemento = document.querySelector('.aca_delete');
    elemento?.classList.remove('modal--show');
    elemento = document.querySelector('.aca_nueva');
    elemento?.classList.remove('modal--show');
  }

  onEditExp(experiencia: any) {
    this.id = experiencia.idExperiencia;
    this.t = experiencia.titulo;
    this.formExp.controls['titulo'].setValue(experiencia.titulo);
    this.formExp.controls['establecimiento'].setValue(
      experiencia.establecimiento
    );
    this.formExp.controls['lugar'].setValue(experiencia.lugar);
    this.formExp.controls['desde'].setValue(experiencia.desde);
    this.formExp.controls['hasta'].setValue(experiencia.hasta);
    this.formExp.controls['duracion'].setValue(experiencia.duracion);
    this.formExp.controls['ciudad'].setValue(experiencia.ciudad);
    this.formExp.controls['provincia'].setValue(experiencia.provincia);
    this.formExp.controls['pais'].setValue(experiencia.pais);
    this.formExp.controls['imagen'].setValue(experiencia.imagen);
    const elemento = document.querySelector('.exp_edit');
    elemento?.classList.add('modal--show');
  }

  onEnviarExp(event: Event) {
    event.preventDefault;
    let credenciales = this.formExp.value;
    let usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

    this.abmService
      .Modificacion(credenciales, 'experiencia', this.id, usuarioJson.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          const obj = JSON.parse(JSON.stringify(data));
          const array = obj.experiencias;
          array.sort((a: any, b: any) => a.idExperiencia - b.idExperiencia);
          this.experienceList = array;
        });
        this.formExp.reset;
        console.log(data2);
        this.onClose(event);
      });
  }

  onEliminarExp(experiencia: any) {
    this.id = experiencia.idExperiencia;
    this.t = experiencia.titulo;
    const elemento = document.querySelector('.exp_delete');
    elemento?.classList.add('modal--show');
  }

  onDeleteExp(event: Event) {
    event.preventDefault;
    this.abmService.Baja('experiencia', this.id).subscribe((data) => {
      console.log(data);
      this.datosPorfolio.obtenerDatos().subscribe((data) => {
        const obj = JSON.parse(JSON.stringify(data));
        const array = obj.experiencias;
        array.sort((a: any, b: any) => a.idExperiencia - b.idExperiencia);
        this.experienceList = array;
      });
      this.formExp.reset;
      this.onClose(event);
    });
  }

  onNuevoE(event: Event) {
    event.preventDefault;
    this.formExp.reset;
    const elemento = document.querySelector('.exp_nueva');
    elemento?.classList.add('modal--show');
  }

  onNuevaExp(event: Event) {
    event.preventDefault;
    let credenciales = this.formExp.value;
    let usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

    this.abmService
      .Alta(credenciales, 'experiencia', usuarioJson.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          const obj = JSON.parse(JSON.stringify(data));
          const array = obj.experiencias;
          array.sort((a: any, b: any) => a.idExperiencia - b.idExperiencia);
          this.experienceList = array;
        });
        this.formExp.reset;
        console.log(data2);
        this.onClose(event);
      });
  }

  onEditAca(academico: any) {
    this.ida = academico.idAcademico;
    this.ta = academico.titulo;
    this.formAca.controls['titulo'].setValue(academico.titulo);
    this.formAca.controls['carrera'].setValue(academico.carrera);
    this.formAca.controls['escuela'].setValue(academico.escuela);
    this.formAca.controls['inicio'].setValue(academico.inicio);
    this.formAca.controls['fin'].setValue(academico.fin);
    this.formAca.controls['puntaje'].setValue(academico.puntaje);
    this.formAca.controls['imagen'].setValue(academico.imagen);
    const elemento = document.querySelector('.aca_edit');
    elemento?.classList.add('modal--show');
  }

  onEnviarAca(event: Event) {
    event.preventDefault;
    let credenciales = this.formAca.value;
    let usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.abmService
      .Modificacion(credenciales, 'academico', this.ida, usuarioJson.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          const obj = JSON.parse(JSON.stringify(data));
          const array2 = obj.academicos;
          array2.sort((a: any, b: any) => a.idAcademico - b.idAcademico);
          this.educationList = array2;
        });
        this.formAca.reset;
        console.log(data2);
        this.onClose(event);
      });
  }

  onEliminarAca(academico: any) {
    this.ida = academico.idAcademico;
    this.ta = academico.titulo;
    const elemento = document.querySelector('.aca_delete');
    elemento?.classList.add('modal--show');
  }

  onDeleteAca(event: Event) {
    event.preventDefault;
    this.abmService.Baja('academico', this.ida).subscribe((data) => {
      console.log(data);
      this.datosPorfolio.obtenerDatos().subscribe((data) => {
        const obj = JSON.parse(JSON.stringify(data));
        const array2 = obj.academicos;
        array2.sort((a: any, b: any) => a.idAcademico - b.idAcademico);
        this.educationList = array2;
      });
      this.formAca.reset;
      this.onClose(event);
    });
  }

  onNuevoA(event: Event) {
    event.preventDefault;
    this.formAca.reset;
    const elemento = document.querySelector('.aca_nueva');
    elemento?.classList.add('modal--show');
  }

  onNuevaAca(event: Event) {
    event.preventDefault;
    let credenciales = this.formAca.value;
    let usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.abmService
      .Alta(credenciales, 'academico', usuarioJson.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          const obj = JSON.parse(JSON.stringify(data));
          const array2 = obj.academicos;
          array2.sort((a: any, b: any) => a.idAcademico - b.idAcademico);
          this.educationList = array2;
        });
        this.formAca.reset;
        console.log(data2);
        this.onClose(event);
      });
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe((data) => {
      const obj = JSON.parse(JSON.stringify(data));
      this.educationList = obj.academicos;

      const array2 = obj.academicos;
      array2.sort((a: any, b: any) => a.idAcademico - b.idAcademico);
      this.educationList = array2;

      const array = obj.experiencias;
      array.sort((a: any, b: any) => a.idExperiencia - b.idExperiencia);
      this.experienceList = array;
    });
  }
}
