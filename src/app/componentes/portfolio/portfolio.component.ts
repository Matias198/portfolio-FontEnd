import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { AutenticationService } from 'src/app/servicios/autentication.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
 
  valor = false;
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

 ngOnInit() {
    if (sessionStorage.getItem('currentUser') == null){
      this.loginGuest();
      console.log('iniciando guest');
    }else{
      this.valor = true
    }
  }

  loginGuest() {
    this.autenticationService
      .IniciarSesion(this.formGuest.value)
      .subscribe((data) => {
        console.log(data);
        this.valor = true
      });
  }

}
