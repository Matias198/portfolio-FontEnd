import { Component, OnInit, Input } from '@angular/core'; 
import { AlertService } from '@full-fledged/alerts';
import { AbmService } from 'src/app/servicios/abm.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service'; 
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'; 
import { AutenticationService } from 'src/app/servicios/autentication.service';
 
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit { 
  @Input()usuario:any; 

  public loading = false;
  usuarioJson:any 
  form: FormGroup;
  formPerfil: FormGroup;
  acercaDeList: any;
  id: number;
  t: string;

  constructor(
    private datosPorfolio: PorfolioService,
    private formBuilder: FormBuilder,
    private abmService: AbmService,
    private alertService: AlertService,
    private autenticationService: AutenticationService
  ) {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.formPerfil = this.formBuilder.group({
      nombres: ['', Validators.requiredTrue],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      mail: ['', Validators.required],
      ocupacion: ['', Validators.required],
      image_background: ['', Validators.required],
      image_perfil: ['', Validators.required]
    }) 
    this.id = 0;
    this.t = '';
  }

  alertDanger(message:any): void{
    this.alertService.danger(message); 
  }

  get titulo() {
    return this.form.get('titulo');
  }

  get descripcion() {
    return this.form.get('descripcion');
  }

  get nombres() {
    return this.formPerfil.get('nombres');
  }
  get apellido() {
    return this.formPerfil.get('apellido');
  }
  get fecha_nacimiento() {
    return this.formPerfil.get('fecha_nacimiento');
  }
  get nacionalidad() {
    return this.formPerfil.get('nacionalidad');
  }
  get mail() {
    return this.formPerfil.get('mail');
  }
  get ocupacion() {
    return this.formPerfil.get('ocupacion');
  }
  get image_background() {
    return this.formPerfil.get('image_background');
  }
  get image_perfil() {
    return this.formPerfil.get('image_perfil');
  }

  onEnviarPerfil(event: Event){ 
    event.preventDefault;
    this.loading = true;
    let credenciales = this.formPerfil.value; 
    this.abmService
      .Modificacion(credenciales, 'persona', 1, this.usuario.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          this.usuario = JSON.parse(JSON.stringify(data)); 
          this.formPerfil.patchValue({});
          this.formPerfil.markAsPristine();
          this.formPerfil.markAsUntouched();
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
    const array = this.usuario.secciones;
    array.sort((a: any, b: any) => a.idSeccion - b.idSeccion);
    this.usuario.secciones = array; 
    this.usuarioJson = this.autenticationService.usuarioAutenticado
  }

  onEditarPerfil(event: Event) {
    event.preventDefault; 
    this.formPerfil.controls['nombres'].setValue(this.usuario.nombres);
    this.formPerfil.controls['apellido'].setValue(this.usuario.apellido);
    this.formPerfil.controls['fecha_nacimiento'].setValue(this.usuario.fecha_nacimiento);
    this.formPerfil.controls['nacionalidad'].setValue(this.usuario.nacionalidad);
    this.formPerfil.controls['mail'].setValue(this.usuario.mail);
    this.formPerfil.controls['ocupacion'].setValue(this.usuario.ocupacion);
    this.formPerfil.controls['image_background'].setValue(this.usuario.image_background);
    this.formPerfil.controls['image_perfil'].setValue(this.usuario.image_perfil);
    const elemento = document.querySelector('.perfil_edit');
    elemento?.classList.add('modal--show');
  }

  onNuevo(event: Event) {
    event.preventDefault; 
    this.form.markAsPristine();
    this.form.markAsUntouched();
    const elemento = document.querySelector('.acercade_nuevo');
    elemento?.classList.add('modal--show');
  }

  onEnviarNuevo(event: Event) {
    event.preventDefault;
    this.loading = true;
    let credenciales = this.form.value;
    this.abmService
      .Alta(credenciales, 'seccion', this.usuario.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          this.usuario = JSON.parse(JSON.stringify(data));
          const array = this.usuario.secciones;
          array.sort((a: any, b: any) => a.idSeccion - b.idSeccion);
          this.usuario.secciones = array;  
          this.onClose(event);
          this.loading = false;
          Swal.fire('OK', data2.mensaje, 'success')
        });
      }, (err)=>{ 
        this.loading = false;
        Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
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
    this.loading = true;
    let credenciales = this.form.value;
    this.abmService
      .Modificacion(credenciales, 'seccion', this.id, this.usuario.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          this.usuario = JSON.parse(JSON.stringify(data));
          const array = this.usuario.secciones;
          array.sort((a: any, b: any) => a.idSeccion - b.idSeccion);
          this.usuario.secciones = array; 
          this.onClose(event);
          this.loading = false;
          Swal.fire('OK', data2.mensaje, 'success')
        });
      }, (err)=>{ 
        this.loading = false;
        Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
      });
  }

  onDelete(event: Event) {
    event.preventDefault;
    this.loading = true;
    this.abmService.Baja('seccion', this.id)
    .subscribe((data2) => { 
      this.datosPorfolio.obtenerDatos().subscribe((data) => {
        this.usuario = JSON.parse(JSON.stringify(data));
        const array = this.usuario.secciones;
        array.sort((a: any, b: any) => a.idSeccion - b.idSeccion);
        this.usuario.secciones = array; 
        this.onClose(event); 
        this.loading = false;
        Swal.fire('OK', data2.mensaje, 'success')
      });
    }, (err)=>{ 
      this.loading = false;
      Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
    });
  }
}
