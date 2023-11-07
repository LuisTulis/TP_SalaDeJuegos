import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  mail = "";
  password = "";
  
  logeoExitoso = false;
  errorMessage = "";

  constructor(private router: Router, private Auth : AngularFireAuth, private auth : AuthService) {}
  ngOnInit(): void 
  {}

  login()
  {
    if(this.mail == "" || this.password == "")
    {
      this.errorMessage = "Error: Rellena todos los campos.";
    }
    else
    {
      this.auth.logIn(this.mail, this.password)
        .then(userCredential => {
          // Inicio de sesión exitoso
          console.log('Usuario autenticado:', userCredential.user);
          this.errorMessage = ''; // Limpiar el mensaje de error en caso de éxito

          // Redirige a la página principal o a la ruta deseada
          this.router.navigate(['/dashboard']); // Cambia '/dashboard' a la ruta deseada
        })
        .catch(error => {
          // Manejar el error
          console.error('Error al iniciar sesión:', error);
          this.errorMessage = "Error: Credenciales incorrectas.";
        })
        .finally( ()=>
        {
          if(this.errorMessage == "")
          {
            this.auth.usuarioLogueado = true;
            this.logeoExitoso = true;
            setTimeout(() => {
              this.router.navigate(['/home']); // Cambia '/otra-ruta' a la ruta deseada
            }, 3000);
          }
        });
    }
  }

  loginTestUser(mail : string, password : string)
  {
    this.mail = mail;
    this.password = password;
  }

}
