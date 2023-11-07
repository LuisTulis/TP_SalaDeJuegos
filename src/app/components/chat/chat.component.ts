import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Mensaje } from '../../clases/mensaje'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Timestamp } from 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit
{
  messages : Mensaje[] = []
  usuarioActual : any;
  mensajeIngresado : string = "";

  constructor(private firestore : FirestoreService, private auth : AuthService, private router : Router){}

  async ngOnInit()
  {
    this.auth.obtenerDatosUsuario().subscribe(user =>
    {
      this.usuarioActual = user;
    });
    
    this.firestore.traerDatos('Chat',true).subscribe(mensajes =>
    {
      this.messages = mensajes as Mensaje[];
    })
    
  }

  subirMensaje()
  {
    let mensajeASubir = 
    {
      mensaje : this.mensajeIngresado,
      autor : this.usuarioActual.email,
      timestamp : Timestamp.now().toDate()
    }

    this.firestore.agregarDato('Chat',mensajeASubir);

    this.mensajeIngresado = "";
  }

  navigateToHome()
  {
    this.router.navigate(['/home']);
  }
}

