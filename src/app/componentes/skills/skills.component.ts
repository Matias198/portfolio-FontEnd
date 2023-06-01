import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AbmService } from 'src/app/servicios/abm.service';
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
  skillsList: any;
  usuarioJson: any;
  skill: String;
  form: UntypedFormGroup;
  id: number;

  constructor(
    private datosPorfolio: PorfolioService,
    private formBuilder: UntypedFormBuilder,
    private abmService: AbmService
  ) {
    this.form = this.formBuilder.group({
      progreso: [0, Validators.required],
      titulo: ['', Validators.required],
    });
    this.usuarioJson = JSON.parse(
      sessionStorage.getItem('currentUser') || '{}'
    );
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
    let usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.abmService
      .Modificacion(credenciales, 'skill', this.id, usuarioJson.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          const obj = JSON.parse(JSON.stringify(data));
          const array = obj.skills;
          array.sort((a: any, b: any) => a.idSkill - b.idSkill);
          this.skillsList = array;
        });
        this.form.reset;
        console.log(data2);
        this.onClose(event);
        this.loading = false;
        Swal.fire('OK', 'Se actualizaron los datos de la habilidad.', 'success')
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
    this.abmService.Baja('skill', this.id).subscribe((data) => {
      console.log(data);
      this.datosPorfolio.obtenerDatos().subscribe((data) => {
        const obj = JSON.parse(JSON.stringify(data));
        const array = obj.skills;
        array.sort((a: any, b: any) => a.idSkill - b.idSkill);
        this.skillsList = array;
      });
      this.form.reset;
      this.onClose(event);
      this.loading = false;
      Swal.fire('OK', 'Se eliminó la habilidad.', 'success')
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
    let usuarioJson = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.abmService
      .Alta(credenciales, 'skill', usuarioJson.dni)
      .subscribe((data2) => {
        this.datosPorfolio.obtenerDatos().subscribe((data) => {
          const obj = JSON.parse(JSON.stringify(data));
          const array = obj.skills;
          array.sort((a: any, b: any) => a.idSkill - b.idSkill);
          this.skillsList = array;
        });
        this.form.reset;
        console.log(data2);
        this.onClose(event);
        this.loading = false;
        Swal.fire('OK', 'Se creao una nueva habilidad.', 'success')
      }, (err)=>{ 
        this.loading = false;
        Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
      });
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe((data) => {
      const obj = JSON.parse(JSON.stringify(data));
      const array = obj.skills;
      array.sort((a: any, b: any) => a.idSkill - b.idSkill);
      this.skillsList = array;  
    });
  }
}
