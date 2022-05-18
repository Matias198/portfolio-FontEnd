import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/servicios/autentication.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})

export class RegistrarUsuarioComponent implements OnInit {
  formDatos:FormGroup;
  constructor(private formBuilder:FormBuilder,private autenticationService:AutenticationService, private ruta:Router) { 
    this.formDatos=this.formBuilder.group(
      {
        dni:['', [Validators.required]],
        nombres:['', [Validators.required]],
        apellido:['', [Validators.required]],
        fecha_nacimiento:['', [Validators.required]],
        nacionalidad:['', [Validators.required]],
        mail:['', [Validators.required]],
        ocupacion:['', [Validators.required]],
        image_background:['', [Validators.required]],
        image_perfil:['', [Validators.required]],
        deviceInfo:this.formBuilder.group({
          deviceId: ["17867868768"],
          deviceType: ["DEVICE_TYPE_ANDROID"],
          notificationToken: ["67657575eececc34"]
        })
      }
    )
  }

  ngOnInit(): void {
  }

  get dni(){
    return this.formDatos.get('dni');
  }

  get nombres(){
    return this.formDatos.get('nombres');
  }

  get apellido(){
    return this.formDatos.get('apellido');
  }

  get fecha_nacimiento(){
    return this.formDatos.get('fecha_nacimiento');
  }

  get nacionalidad(){
    return this.formDatos.get('nacionalidad');
  }

  get mail(){
    return this.formDatos.get('mail');
  }

  get ocupacion(){
    return this.formDatos.get('ocupacion');
  }

  get image_background(){
    return this.formDatos.get('image_background');
  }

  get image_perfil(){
    return this.formDatos.get('image_perfil');
  }

  onEnviar(event:Event){
    event.preventDefault;
    this.autenticationService.CrearUsuario(this.formDatos.value).subscribe(data => {
      console.log("DATA:" + JSON.stringify(data));
      this.ruta.navigate(["iniciar-sesion"]);
    })
  }
}
