import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent 
{

  mail = "";
  password = "";
  rePassword = "";
  exito = true;
  errorMessage = "";
  registroExitoso = false;


  constructor(private router: Router, private Auth : AuthService, private firestore : FirestoreService) {}
  ngOnInit(): void 
  {

  }
  

  registrar()
  {
    if(this.mail == "" || this.password == "" || this.rePassword == "")
    {
      this.errorMessage = "Error: Rellena todos los campos.";
    }
    else
    {
      if(this.password != this.rePassword)
      {
        this.errorMessage = "Error: Las contraseñas no coinciden."
      }
      else
      {
        this.Auth.registrar(this.mail, this.password)
        .then(userCredential => {
          // Usuario creado con éxito
          console.log('Usuario creado:', userCredential.user);
          this.errorMessage = ''; // Limpiar el mensaje de error si la operación fue exitosa
        })
        .catch(error => {
          // Manejar el error
          console.error('Error al crear el usuario:', error);
          this.errorMessage = error.message;
        })
        .finally(() =>
        {
          if(this.errorMessage == "Firebase: The email address is badly formatted. (auth/invalid-email).")
          {
            this.errorMessage = "Error: Formato de correo electronico invalido.";
          }
          else
          {
            if(this.errorMessage == "Firebase: Password should be at least 6 characters (auth/weak-password).")
            {
              this.errorMessage = "Error: La contraseña debe contener minimo 6 caracteres.";
            }
            else
            {
              if(this.errorMessage == "Firebase: The email address is already in use by another account. (auth/email-already-in-use).")
              {
                this.errorMessage = "Error: El correo electronico ya se encuentra en uso.";
              }
            }
          }
          if(this.errorMessage == "")
          {
            let nuevoPuntaje = {
              mail : this.mail.toLowerCase(),
              ahorcado : 0,
              preguntados : 0,
              mayorMenor : 0,
              palabrasEncadenadas : 0
            }

            this.firestore.agregarDato('datosDeJuegos',nuevoPuntaje);

            this.Auth.usuarioLogueado = true;
            this.registroExitoso = true;
            setTimeout(() => {
              this.router.navigate(['/home']); // Cambia '/otra-ruta' a la ruta deseada
            }, 3000);
          }
        });
      }
    }
  }
}

