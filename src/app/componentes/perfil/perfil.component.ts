import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  miPorfolio: any;
  usuarioJson: any;

  constructor(private datosPorfolio: PorfolioService) {
    this.usuarioJson = JSON.parse(
      sessionStorage.getItem('currentUser') || '{}'
    );
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe((data) => {
      const obj = JSON.parse(JSON.stringify(data));
      this.miPorfolio = obj;
    });
  }
}
