import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit
{
  usuarioActual : any;
  datosPreguntados : any[];
  datosAhorcado : any[];
  datosMayorMenor : any[];
  datosPalabrasEncadenadas : any[]

  constructor(private auth : AuthService, private firestore : FirestoreService, private router : Router)
  {
    this.datosPreguntados = [];
    this.datosAhorcado = [];
    this.datosMayorMenor = [];
    this.datosPalabrasEncadenadas = [];
  }

  ngOnInit(): void 
  {

    this.auth.obtenerDatosUsuario().subscribe(user =>
    {
      this.usuarioActual = user;
      this.firestore.traerDatos('datosDeJuegos',false).subscribe(datos =>
      {
        this.datosPreguntados = [];
        this.datosAhorcado = [];
        this.datosMayorMenor = [];
        this.datosPalabrasEncadenadas = [];
        
        for(let i = 0; i<datos.length; i++)
        {
          let nombreUsuario = datos[i].mail.split('@')[0];
          this.datosPreguntados.push(
          {
            'mail' : nombreUsuario,
            'puntos' : datos[i].preguntados
          })

          this.datosAhorcado.push(
          {
            'mail' : nombreUsuario,
            'puntos' : datos[i].ahorcado
          })

          this.datosPalabrasEncadenadas.push(
            {
              'mail' : nombreUsuario,
              'puntos' : datos[i].palabrasEncadenadas
            })

          this.datosMayorMenor.push(
            {
              'mail' : nombreUsuario,
              'puntos' : datos[i].mayorMenor
            })
        }

        this.datosAhorcado.sort((a,b) => b.puntos - a.puntos);
        this.datosMayorMenor.sort((a,b) => b.puntos - a.puntos);
        this.datosPalabrasEncadenadas.sort((a,b) => b.puntos - a.puntos);
        this.datosPreguntados.sort((a,b) => b.puntos - a.puntos);
      })
    });
  }

  irAlChat()
  {
    this.router.navigateByUrl('/chat');
  }

  irAlHome()
  {
    this.router.navigateByUrl('/home');
  }

}
