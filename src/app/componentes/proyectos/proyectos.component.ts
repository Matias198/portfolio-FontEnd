import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  proyectList: any;
  usuarioJson: any;
  constructor(private datosPorfolio: PorfolioService) {
    this.usuarioJson = JSON.parse(
      sessionStorage.getItem('currentUser') || '{}'
    );
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe((data) => {
      const obj = JSON.parse(JSON.stringify(data));
      this.proyectList = obj.proyectos;
    });
  }
}
