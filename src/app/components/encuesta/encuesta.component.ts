import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Encuesta } from 'src/app/clases/encuesta';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit
{
  usuarioActual : any;
  encuesta : Encuesta

  ngOnInit(): void {
      
  }

  constructor(private router : Router, private toast : ToastService, private firestore : FirestoreService, private auth : AuthService)
  {
    this.encuesta = new Encuesta();
    this.auth.obtenerDatosUsuario().subscribe(datos =>{
      this.usuarioActual = datos;
    })
  }

  irAlHome()
  {
    this.router.navigateByUrl('/home');
  }

  submitEncuesta(encuestaForm : NgForm) 
  {
    if (encuestaForm.valid) 
    {
      this.encuesta.mail = this.usuarioActual.email;
      let encuesta = {
        mail : this.encuesta.mail,
        telefono : this.encuesta.telefono,
        satisfaccion : this.encuesta.satisfaccion,
        comentario : this.encuesta.comentario,
        edad : this.encuesta.edad,
        juegoFavorito : this.encuesta.juegoFavorito,
        nombre : this.encuesta.nombreApellido
      }
      this.firestore.agregarDato('encuestas',encuesta);
      
      this.toast.showSuccess('','¡Encuesta enviada con exito!');
      setTimeout(() => 
      {
        this.router.navigateByUrl('home');
      }, 3000)
    } else 
    {
      this.toast.showError('Error','Campos vacios o con formato incorrecto.');
      console.log(encuestaForm.controls['nombreApellido'].errors)
      console.log(encuestaForm.controls['edad'].errors)
      console.log(encuestaForm.controls['telefono'].errors)
      console.log(encuestaForm.controls['satisfaccion'].errors)
      console.log(encuestaForm.controls['juegoFavorito'].errors)
    }
  }


}
