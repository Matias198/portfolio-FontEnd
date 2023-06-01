import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit { 
  public loading = true;  
  usuario = new Observable<any>();
  constructor(private datosPorfolio: PorfolioService) {}

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe((data) => {
      this.usuario = JSON.parse(JSON.stringify(data)); 
      this.loading = false
    }, (err)=>{
      this.ngOnInit()
    });
  }
}
