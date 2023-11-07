import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs: AngularFireAuth, private afAuth : AngularFireAuth, private router : Router) 
  {
    this.obtenerDatosUsuario().subscribe(datos =>{
      if(datos != undefined)
      {
        this.usuarioLogueado = true;
      }
    })
  }

  usuarioLogueado : boolean = false
  registrar(mail : string, password : string)
  {
    return this.afAuth.createUserWithEmailAndPassword(mail, password);
  }

  obtenerDatosUsuario()
  {
    return this.afAuth.authState;
  }

  logOut()
  {
    this.usuarioLogueado = false;
    this.afAuth.signOut();
  }

  logIn(mail : string, password : string)
  {
    return this.afAuth.signInWithEmailAndPassword(mail,password);
  }

}
