import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutenticationService } from './servicios/autentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'PorfolioDinamicoAngular';

  formGuest: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private autenticationService: AutenticationService
  ) {
    this.formGuest = this.formBuilder.group({
      dni: [1],
      password: ['guest'],
    });
  
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')==null){ 
      console.log('iniciando guest');
      this.loginGuest();
    }      
  }

  loginGuest() {
    this.autenticationService
      .IniciarSesion(this.formGuest.value)
      .subscribe((data) => { 
        console.log(data);
      });
  }
}
