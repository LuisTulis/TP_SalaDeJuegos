import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-resultados-encuesta',
  templateUrl: './resultados-encuesta.component.html',
  styleUrls: ['./resultados-encuesta.component.css']
})
export class ResultadosEncuestaComponent 
{

  encuestas : any[];
  usuarioActual : any;
  constructor(private auth : AuthService, private router : Router, private firestore : FirestoreService)
  {
    this.encuestas = [];
    this.auth.obtenerDatosUsuario().subscribe(datos =>{
      this.usuarioActual = datos;
    })
    this.firestore.traerDatos('encuestas', false).subscribe(datos =>{
      this.encuestas = datos as any[];
    })
  }

  irAlHome()
  {
    this.router.navigateByUrl('/home');
  }

}
