import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
//import { GuardGuard } from './servicios/guard.guard';

const routes: Routes = [
  {path:'', redirectTo:'portfolio', pathMatch:'full'},
  //{path:'**', redirectTo:'portfolio'},
  {path:'portfolio', component:PortfolioComponent}, //canActivate:[GuardGuard]
  {path:'iniciar-sesion', component:IniciarSesionComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
