import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ErrorComponent } from './components/error/error.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ChatComponent } from './components/chat/chat.component';
import { AhorcadoComponent } from './components/juegos/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './components/juegos/mayor-omenor/mayor-omenor.component';
import { PreguntadosComponent } from './components/juegos/preguntados/preguntados.component';
import { SiguientePalabraComponent } from './components/juegos/siguiente-palabra/siguiente-palabra.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ResultadosEncuestaComponent } from './components/resultados-encuesta/resultados-encuesta.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'aboutme', component: AboutmeComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'chat', component: ChatComponent, canActivate:[loginGuard]},
  { path: 'leaderboard', component: LeaderboardComponent},
  { path: 'encuesta', component: EncuestaComponent, canActivate:[loginGuard]},
  { path: 'encuesta/resultados', component: ResultadosEncuestaComponent},
  { path: '', redirectTo : 'home', pathMatch : 'full'},
  { path: '##', component: ErrorComponent},
  { path: 'juegos', canActivate:[loginGuard], loadChildren: () => import('./components/juegos/juegos.module').then(m => m.JuegosModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
