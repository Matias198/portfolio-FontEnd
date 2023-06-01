import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/servicios/autentication.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent implements OnInit {
  public loading = false;

  form: UntypedFormGroup;
  formGuest: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private autenticationService: AutenticationService,
    private ruta: Router
  ) {
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.formGuest = this.formBuilder.group({
      dni: [1],
      password: ['guest'],
    });
  }

  ngOnInit(): void {
    window.sessionStorage.clear();
  }

  get dni() {
    return this.form.get('dni');
  }

  get password() {
    return this.form.get('password');
  }

  onEnviar(event: Event) {
    event.preventDefault;
    this.loading = true;
    this.autenticationService
      .IniciarSesion(this.form.value)
      .subscribe((data) => {
        console.log(data);
        this.loading = false;
        this.ruta.navigate(['portfolio']);
      }, (err)=>{ 
        this.loading = false;
        Swal.fire('Error', 'Vuelva a intentarlo corroborando sus datos. Mensaje del servidor: ' + err.error.mensaje, 'error')
      });
  }

  onGuest(event: Event) {
    event.preventDefault;
    this.autenticationService
      .IniciarSesion(this.formGuest.value)
      .subscribe((data) => {
        console.log(data);
        this.ruta.navigate(['portfolio']);
      });
  }
}
