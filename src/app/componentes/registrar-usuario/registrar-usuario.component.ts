import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/servicios/autentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})

export class RegistrarUsuarioComponent implements OnInit {
  form:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private autenticationService:AutenticationService,
              private ruta:Router,
              private http:HttpClient){ 
    this.form=this.formBuilder.group(
      {
        dni:['', [Validators.required]],
        nombres:['', [Validators.required]],
        apellido:['', [Validators.required]],
        fecha_nacimiento:['', [Validators.required]],
        nacionalidad:['', [Validators.required]],
        mail:['', [Validators.required]],
        ocupacion:['', [Validators.required]],
        image_background:['', [Validators.required]],
        image_perfil:['', [Validators.required]]/*,
        deviceInfo:this.formBuilder.group({
          deviceId: ["17867868768"],
          deviceType: ["DEVICE_TYPE_ANDROID"],
          notificationToken: ["67657575eececc34"]
        })*/
      }
    )
  }

  ngOnInit(): void {
  }

  get dni(){
    return this.form.get('dni');
  }

  get nombres(){
    return this.form.get('nombres');
  }

  get apellido(){
    return this.form.get('apellido');
  }

  get fecha_nacimiento(){
    return this.form.get('fecha_nacimiento');
  }

  get nacionalidad(){
    return this.form.get('nacionalidad');
  }

  get mail(){
    return this.form.get('mail');
  }

  get ocupacion(){
    return this.form.get('ocupacion');
  }

  get image_background(){
    return this.form.get('image_background');
  }

  get image_perfil(){
    return this.form.get('image_perfil');
  }

  url="https://porfolio-matias-fernandez.herokuapp.com/";
  onEnviar(event:Event){
    event.preventDefault;
    var formData: any = new FormData();
    formData.append('dni', this.form.get('dni')!.value);
    formData.append('nombres', this.form.get('nombres')!.value);
    formData.append('apellido', this.form.get('apellido')!.value);
    formData.append('fecha_nacimiento', this.form.get('fecha_nacimiento')!.value);
    formData.append('nacionalidad', this.form.get('nacionalidad')!.value);
    formData.append('mail', this.form.get('mail')!.value);
    formData.append('ocupacion', this.form.get('ocupacion')!.value);
    formData.append('image_background', this.form.get('image_background')!.value);
    formData.append('image_perfil', this.form.get('image_perfil')!.value);
    console.log(JSON.stringify(formData))
    return this.http
    .post(this.url + "registrar-usuario", formData)
    .subscribe(data => {
      console.log("DATA:" + JSON.stringify(data));
      this.ruta.navigate(["iniciar-sesion"]);
    })
  }
}
