import { Component, OnInit, Input } from '@angular/core'; 
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbmService } from 'src/app/servicios/abm.service';
import { AutenticationService } from 'src/app/servicios/autentication.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {  

  @Input()usuario:any;

  public loading = false;  
  usuarioJson:any
  form: FormGroup;
  t: String;
  id: number;

  constructor(
    private datosPorfolio: PorfolioService,
    private formBuilder: UntypedFormBuilder,
    private abmService: AbmService,
    private autenticationService: AutenticationService
  ) {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      link: ['', Validators.required]
    }); 
    this.t = '';
    this.id = 0;
  }

  get titulo() {
    return this.form.get('titulo');
  }

  get descripcion() {
    return this.form.get('descripcion');
  }

  get link() {
    return this.form.get('link');
  }

  onClose(event: Event) {
    event.preventDefault;
    this.id = 0;
    this.t = '';
    let elemento = document.querySelector('.pro_edit');
    elemento?.classList.remove('modal--show');
    elemento = document.querySelector('.pro_delete');
    elemento?.classList.remove('modal--show');
    elemento = document.querySelector('.pro_nueva');
    elemento?.classList.remove('modal--show');
  }

  onEnviar(event: Event) {
    event.preventDefault;
    this.loading = true
    let credenciales = this.form.value;
    let usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.abmService
      .Modificacion(credenciales, 'proyecto', this.id, usuarioJson.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          this.usuario = JSON.parse(JSON.stringify(data));
          const array = this.usuario.proyectos;
          array.sort((a: any, b: any) => a.idProyecto - b.idProyecto);
          this.usuario.proyectos = array; 
          this.onClose(event);
          this.loading = false;
          Swal.fire('OK', data2.mensaje, 'success')
        });
      }, (err)=>{ 
        this.loading = false;
        Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
      });
  }

  onEliminar(proyecto: any) {
    this.id = proyecto.idProyecto;
    this.t = proyecto.titulo;
    const elemento = document.querySelector('.pro_delete');
    elemento?.classList.add('modal--show');
  }

  onDelete(event: Event) {
    event.preventDefault;
    this.loading = true
    this.abmService.Baja('proyecto', this.id)
    .subscribe((data2) => { 
      this.datosPorfolio.obtenerDatos().subscribe((data) => {
        this.usuario = JSON.parse(JSON.stringify(data));
        const array = this.usuario.proyectos;
        array.sort((a: any, b: any) => a.idProyecto - b.idProyecto);
        this.usuario.proyectos = array; 
        this.onClose(event);
        this.loading = false;
        Swal.fire('OK', data2.mensaje, 'success')
      });
    }, (err)=>{ 
      this.loading = false;
      Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
    });
  }

  onNuevo(event: Event) {
    event.preventDefault;
    this.form.reset;
    const elemento = document.querySelector('.pro_nueva');
    elemento?.classList.add('modal--show');
  }

  onEdit(proyecto: any) {
    this.id = proyecto.idProyecto;
    this.t = proyecto.titulo;
    this.form.controls['titulo'].setValue(proyecto.titulo);
    this.form.controls['descripcion'].setValue(proyecto.descripcion);
    this.form.controls['link'].setValue(proyecto.link);
    const elemento = document.querySelector('.pro_edit');
    elemento?.classList.add('modal--show');
  }

  onNueva(event: Event) {
    event.preventDefault;
    this.loading = true
    let credenciales = this.form.value;
    let usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.abmService
      .Alta(credenciales, 'proyecto', usuarioJson.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          this.usuario = JSON.parse(JSON.stringify(data));
          const array = this.usuario.proyectos;
          array.sort((a: any, b: any) => a.idProyecto - b.idProyecto);
          this.usuario.proyectos = array;
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
    const array = this.usuario.proyectos;
    array.sort((a: any, b: any) => a.idProyecto - b.idProyecto);
    this.usuario.proyectos = array; 
    this.usuarioJson = this.autenticationService.usuarioAutenticado
  }
}
