import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutenticationService } from './servicios/autentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PorfolioDinamicoAngular';
  valor = false;

  formGuest: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private autenticationService: AutenticationService,
    private ruta: Router
  ) { 
    this.formGuest = this.formBuilder.group({
      dni: [1],
      password: ['guest'],
    });
  }

  async onInit() { 
    this.autenticationService
      .IniciarSesion(this.formGuest.value)
      .subscribe((data) => {
        console.log(data);
        this.ruta.navigate(['portfolio']);
        this.valor = true;
      });
  }
}
