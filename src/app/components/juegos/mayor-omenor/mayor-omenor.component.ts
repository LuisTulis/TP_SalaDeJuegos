import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-mayor-omenor',
  templateUrl: './mayor-omenor.component.html',
  styleUrls: ['./mayor-omenor.component.css']
})
export class MayorOMenorComponent implements OnInit
{
  mazo : any[];
  usuarioActual : any;
  indiceActual : number = 0;
  valorActual = 0;
  valorSiguiente = 0;
  pathImage : string = "";

  datosUsuario : any;

  constructor(private api : ApiService, private auth : AuthService, private router: Router, private toast : ToastService, private firestore : FirestoreService)
  {
    this.usuarioActual = this.auth.obtenerDatosUsuario();
    this.firestore.traerDatos('datosDeJuegos', false).subscribe(datos=>
    {
      for(let i = 0; i<datos.length; i++)
      {
        console.log(datos[i].mail, " ",this.usuarioActual.email );
        if(datos[i].mail == this.usuarioActual.email)
        {
          this.datosUsuario = datos[i];
          console.log(this.datosUsuario);
          break;
        }
      }
    })
    this.mazo = [];
  }

  ngOnInit(): void
  {
    this.api.getData('https://www.deckofcardsapi.com/api/deck/new/draw/?count=52').subscribe(datos =>
    {
      this.mazo = JSON.parse(datos[0]).cards;
      this.actualizarValor();
    })
  }

  esMenor()
  { 
    console.log(this.valorActual >= this.valorSiguiente);
    if(this.valorActual >= this.valorSiguiente)
    {
      this.points++;
      this.actualizarValor();
      this.toast.showSuccess('¡Correcto!','')
    }
    else
    {
      this.finalizarPartida();
    }
  }


  finalizarPartida()
  {
    this.toast.showError('¡Perdiste!','Alcanzaste ' + this.points + ' puntos.');
   
    if(this.datosUsuario.palabrasEncadenadas < this.points)
    {
      this.datosUsuario.palabrasEncadenadas = this.points;
      this.firestore.updateDocument(this.datosUsuario.id,this.datosUsuario,'datosDeJuegos');
    }

    setTimeout(() => 
    {
      this.juegoIniciado = false;
      
       this.reiniciarDatos();
    }, 3000)
  }

  esMayor()
  {
    console.log(this.valorActual <= this.valorSiguiente);
    if(this.valorActual <= this.valorSiguiente)
    {
      this.points++;
      this.actualizarValor();
      this.toast.showSuccess('¡Correcto!','')
    }
    else
    {
      this.finalizarPartida()
    }
  }

  obtenerValor(valor : string)
  {
    let retorno = valor;
    switch(valor)
    {
      case "ACE":
        retorno = "14";
        break;
      case "KING":
        retorno = "13";
        break;
      case "QUEEN":
        retorno = "12";
        break;
      case "JACK":
        retorno = "11";
        break;
    }
    console.log(retorno);
    return parseInt(retorno)
  }

  actualizarValor()
  {
    this.valorActual = this.obtenerValor(this.mazo[this.points].value);
    this.valorSiguiente = this.obtenerValor(this.mazo[this.points+1].value);
    this.pathImage = this.mazo[this.points].image;
  }

  irAlChat()
  {
    this.router.navigateByUrl('/chat');
  }

  irAlHome()
  {
    this.router.navigateByUrl('/home');
  }

  points : number = 0;
  juegoIniciado : boolean = false;

  comenzarJuego()
  {
    this.points = 0;
    this.reiniciarDatos();
    this.juegoIniciado = true;
  }

  reiniciarDatos()
  {
    this.points = 0;
  }

}
