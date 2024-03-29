import { Component, OnInit, Input } from '@angular/core'; 
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { AbmService } from 'src/app/servicios/abm.service';
import { AutenticationService } from 'src/app/servicios/autentication.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {

  @Input()usuario:any;

  public loading = false; 

  usuarioJson:any
  formExp: FormGroup;
  formAca: FormGroup;
  id: number;
  ida: number;
  t: string;
  ta: string;

  constructor(
    private datosPorfolio: PorfolioService,
    private formBuilder: FormBuilder,
    private abmService: AbmService,
    private autenticationService: AutenticationService
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
    this.loading = true;
    let credenciales = this.formExp.value; 
    this.abmService
      .Modificacion(credenciales, 'experiencia', this.id, this.usuario.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          this.usuario = JSON.parse(JSON.stringify(data));
          const array = this.usuario.experiencias;
          array.sort((a: any, b: any) => a.idExperiencia - b.idExperiencia);
          this.usuario.experiencias = array;
          this.onClose(event);
          this.loading = false;
          Swal.fire('OK', data2.mensaje, 'success')
        });  
      }, (err)=>{ 
        this.loading = false;
        Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
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
    this.loading = true;
    this.abmService.Baja('experiencia', this.id)
    .subscribe((data2) => { 
      this.datosPorfolio.obtenerDatos().subscribe((data) => {
        this.usuario = JSON.parse(JSON.stringify(data));
        const array = this.usuario.experiencias;
        array.sort((a: any, b: any) => a.idExperiencia - b.idExperiencia);
        this.usuario.experiencias = array;
        this.onClose(event);
        this.loading = false;
        Swal.fire('OK', data2.mensaje, 'success')
      }); 
    }, (err)=>{ 
      this.loading = false;
      Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
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
    this.loading = true
    let credenciales = this.formExp.value; 
    this.abmService
      .Alta(credenciales, 'experiencia', this.usuario.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          this.usuario = JSON.parse(JSON.stringify(data));
          const array = this.usuario.experiencias;
          array.sort((a: any, b: any) => a.idExperiencia - b.idExperiencia);
          this.usuario.experiencias = array;
          this.onClose(event);
          this.loading = false;
          Swal.fire('OK', data2.mensaje, 'success')
        });  
      }, (err)=>{ 
        this.loading = false;
        Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
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
    this.loading = true;
    let credenciales = this.formAca.value; 
    this.abmService
      .Modificacion(credenciales, 'academico', this.ida, this.usuario.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          this.usuario = JSON.parse(JSON.stringify(data));
          const array2 =  this.usuario.academicos;
          array2.sort((a: any, b: any) => a.idAcademico - b.idAcademico);
          this.usuario.academicos = array2;
          this.onClose(event);
          this.loading = false;
          Swal.fire('OK', data2.mensaje, 'success')
        });  
      }, (err)=>{ 
        this.loading = false;
        Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
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
    this.loading = true;
    this.abmService.Baja('academico', this.ida)
    .subscribe((data2) => { 
      this.datosPorfolio.obtenerDatos().subscribe((data) => {
        this.usuario = JSON.parse(JSON.stringify(data));
        const array2 = this.usuario.academicos;
        array2.sort((a: any, b: any) => a.idAcademico - b.idAcademico);
        this.usuario.academicos = array2;
        this.onClose(event);
        this.loading = false;
        Swal.fire('OK', data2.mensaje, 'success')
      }); 
    }, (err)=>{ 
      this.loading = false;
      Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
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
    this.loading = true
    let credenciales = this.formAca.value; 
    this.abmService
      .Alta(credenciales, 'academico', this.usuario.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          this.usuario = JSON.parse(JSON.stringify(data));
          const array2 = this.usuario.academicos;
          array2.sort((a: any, b: any) => a.idAcademico - b.idAcademico);
          this.usuario.academicos = array2;
          this.onClose(event);
          this.loading = false;
          Swal.fire('OK', data2.mensaje, 'success')
        }); 
      }, (err)=>{ 
        this.loading = false;
        Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
      });
  }

  ngOnInit(): void { 
    const array2 = this.usuario.academicos;
    array2.sort((a: any, b: any) => a.idAcademico - b.idAcademico);
    this.usuario.academicos = array2; 
    const array = this.usuario.experiencias;
    array.sort((a: any, b: any) => a.idExperiencia - b.idExperiencia);
    this.usuario.experiencias = array; 
    this.usuarioJson = this.autenticationService.usuarioAutenticado
  }
}
