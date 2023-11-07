import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ErrorComponent } from './components/error/error.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireModule } from '@angular/fire/compat'
import { PerfilComponent } from './components/perfil/perfil.component';
import { ChatComponent } from './components/chat/chat.component';
import {initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {environment} from '../environments/environment';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
import { AhorcadoComponent } from './components/juegos/ahorcado/ahorcado.component';
import { HttpClientModule } from '@angular/common/http';
import { MayorOMenorComponent } from './components/juegos/mayor-omenor/mayor-omenor.component';
import { PreguntadosComponent } from './components/juegos/preguntados/preguntados.component';
import { SiguientePalabraComponent } from './components/juegos/siguiente-palabra/siguiente-palabra.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ResultadosEncuestaComponent } from './components/resultados-encuesta/resultados-encuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AboutmeComponent,
    RegistroComponent,
    ErrorComponent,
    PerfilComponent,
    ChatComponent,
    AhorcadoComponent,
    MayorOMenorComponent,
    PreguntadosComponent,
    SiguientePalabraComponent,
    LeaderboardComponent,
    EncuestaComponent,
    ResultadosEncuestaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }