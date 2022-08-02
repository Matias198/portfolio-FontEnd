import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/servicios/autentication.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent implements OnInit {
  form: FormGroup;
  formGuest: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
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
    this.autenticationService
      .IniciarSesion(this.form.value)
      .subscribe((data) => {
        console.log(data);
        this.ruta.navigate(['portfolio']);
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
