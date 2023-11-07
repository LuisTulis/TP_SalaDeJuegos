import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario'
import { Route, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, audit } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  showInfo : boolean = true;
  usuario : any;
  mensajeLog : string = "";

  constructor(private router : Router, private Auth : AuthService, private api : ApiService, private toast: ToastService)
  {
  }

  ngOnInit()
  {
    this.Auth.obtenerDatosUsuario().subscribe(user => 
    {
      this.usuario = user;

      if(this.usuario)
      {
        this.mensajeLog = "Log Out";
      }
      else
      {
        this.mensajeLog = "Log In";
      } 
    });
       
  }

  redirigir()
  {
    if(this.usuario)
    {
      this.Auth.logOut();
      this.usuario = null;
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }

  redirigirJuego(path : string)
  {
    this.router.navigate(['juegos/'+path]);
  }

  redirigirEncuesta()
  {
    if(this.usuario?.email == 'admin@gmail.com')
    {
      this.router.navigateByUrl('encuesta/resultados');
    }
    else
    {
      this.router.navigateByUrl('encuesta');
    }
  }

  redirigirChat()
  {
    this.router.navigateByUrl('chat');
  }

}
