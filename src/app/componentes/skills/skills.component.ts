import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skillsList: any;
  usuarioJson:any;
  
  constructor(private datosPorfolio: PorfolioService) {
    this.usuarioJson = JSON.parse(
      sessionStorage.getItem('currentUser') || '{}'
    );
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe((data) => {
      const obj = JSON.parse(JSON.stringify(data));
      this.skillsList = obj.skills;
    });
  }
}
