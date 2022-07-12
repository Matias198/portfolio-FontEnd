import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/servicios/autentication.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form:FormGroup;
  constructor(private formBuilder:FormBuilder,private autenticationService:AutenticationService, private ruta:Router) { 
    this.form=this.formBuilder.group(
      {
        id_usuario:['', [Validators.required]],
        password:['', [Validators.required, Validators.minLength(8)]]/*,
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

  get id_usuario(){
    return this.form.get('id_usuario')
  }

  get password(){
    return this.form.get('password')
  }

  onEnviar(event:Event){
    event.preventDefault;
    console.log("DATA: " + JSON.stringify(this.form.value))
    this.autenticationService.IniciarSesion(this.form.value).subscribe(data => {
      console.log("DATA:" + JSON.stringify(data))
      this.ruta.navigate(["portfolio"])
    })
  }
}
