import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './mayor-omenor/mayor-omenor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { SiguientePalabraComponent } from './siguiente-palabra/siguiente-palabra.component';

const routes: Routes = [
  { path: 'ahorcado', component: AhorcadoComponent },
  { path: 'mayorOMenor', component: MayorOMenorComponent },
  { path: 'preguntados', component: PreguntadosComponent},
  { path: 'palabrasEncadenadas', component: SiguientePalabraComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
