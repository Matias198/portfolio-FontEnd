import { Component, OnInit, Input } from '@angular/core'; 
import { UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import { AbmService } from 'src/app/servicios/abm.service';
import { AutenticationService } from 'src/app/servicios/autentication.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  @Input()usuario:any;
  
  public loading = false; 
  usuarioJson:any
  skill: String;
  form: FormGroup;
  id: number;

  constructor(
    private datosPorfolio: PorfolioService,
    private formBuilder: UntypedFormBuilder,
    private abmService: AbmService,
    private autenticationService: AutenticationService
  ) {
    this.form = this.formBuilder.group({
      progreso: [0, Validators.required],
      titulo: ['', Validators.required],
    });
    this.skill = '';
    this.id = 0;
  }

  get progreso() {
    return this.form.get('progreso');
  }

  get titulo() {
    return this.form.get('titulo');
  }

  onClose(event: Event) {
    event.preventDefault;
    this.id = 0;
    this.skill = '';
    let elemento = document.querySelector('.skill_edit');
    elemento?.classList.remove('modal--show');
    elemento = document.querySelector('.skill_delete');
    elemento?.classList.remove('modal--show');
    elemento = document.querySelector('.skill_nueva');
    elemento?.classList.remove('modal--show');
  }

  onEnviar(event: Event) {
    event.preventDefault;
    this.loading = true;
    let credenciales = this.form.value; 
    this.abmService
      .Modificacion(credenciales, 'skill', this.id, this.usuario.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          this.usuario = JSON.parse(JSON.stringify(data));
          const array = this.usuario.skills;
          array.sort((a: any, b: any) => a.idSkill - b.idSkill);
          this.usuario.skills = array;
          this.onClose(event);
          this.loading = false;
          Swal.fire('OK', data2.mensaje, 'success')
        }); 
      }, (err)=>{ 
        this.loading = false;
        Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
      });
  }

  onEliminar(skill: any) {
    this.id = skill.idSkill;
    this.skill = skill.titulo;
    const elemento = document.querySelector('.skill_delete');
    elemento?.classList.add('modal--show');
  }

  onDelete(event: Event) {
    event.preventDefault;
    this.loading = true
    this.abmService.Baja('skill', this.id)
    .subscribe((data2) => { 
      this.datosPorfolio.obtenerDatos().subscribe((data) => {
        this.usuario = JSON.parse(JSON.stringify(data));
        const array = this.usuario.skills;
        array.sort((a: any, b: any) => a.idSkill - b.idSkill);
        this.usuario.skills = array; 
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
    const elemento = document.querySelector('.skill_nueva');
    elemento?.classList.add('modal--show');
  }

  onEdit(skill: any) {
    this.id = skill.idSkill;
    this.skill = skill.titulo;
    this.form.controls['titulo'].setValue(skill.titulo);
    this.form.controls['progreso'].setValue(skill.progreso);
    const elemento = document.querySelector('.skill_edit');
    elemento?.classList.add('modal--show');
  }

  onNueva(event: Event) {
    event.preventDefault;
    this.loading = true
    let credenciales = this.form.value; 
    this.abmService
      .Alta(credenciales, 'skill', this.usuario.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          this.usuario = JSON.parse(JSON.stringify(data));
          const array = this.usuario.skills;
          array.sort((a: any, b: any) => a.idSkill - b.idSkill);
          this.usuario.skills = array; 
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
    const array = this.usuario.skills;
    array.sort((a: any, b: any) => a.idSkill - b.idSkill);
    this.usuario.skills = array; 
    this.usuarioJson = this.autenticationService.usuarioAutenticado
  }
}
