import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-siguiente-palabra',
  templateUrl: './siguiente-palabra.component.html',
  styleUrls: ['./siguiente-palabra.component.css']
})
export class SiguientePalabraComponent implements OnInit
{
  palabras : string[];
  alphabet: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ'.split('');
  palabraEscrita: string[];
  palabraAnterior : string;
  palabrasUsadas : string[];

  segundos : number = 0;

  usuarioActual : any;
  datosUsuario : any;

  intervalo : any;

  constructor(private api : ApiService, private auth : AuthService, private router: Router, private toast : ToastService, private firestore : FirestoreService)
  {

    this.auth.obtenerDatosUsuario().subscribe(user =>
    {
      this.usuarioActual = user;
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
    });
    
    this.palabrasUsadas = [];
    this.palabras = [];
    this.palabraEscrita = [];
    this.palabraAnterior = "";
  }
  ngOnInit(): void {

    this.api.getData('https://raw.githubusercontent.com/javierarce/palabras/master/listado-general.txt').subscribe(datos =>
    {
      this.palabras = datos;
      this.palabraAnterior = this.palabras[Math.floor(Math.random() * this.palabras.length)]
      this.palabrasUsadas.push(this.palabraAnterior);
    });
  }

  agregarLetra(letra : string)
  {
    this.palabraEscrita.push(letra);
    console.log(letra);
    console.log(this.palabraEscrita);
  }

  enviarPalabra()
  {
    let palabra = this.palabraEscrita.join("").toLowerCase();
    let sumarPunto : boolean = false;

    console.log(this.palabras.includes(palabra));
    if((palabra[0] == this.palabraAnterior[this.palabraAnterior.length-1]))
    {
      if(!this.palabrasUsadas.includes(palabra))
      {
        if(this.palabras.includes(palabra))
        {
          sumarPunto = true;
        }
      }
    }
   
    if(sumarPunto)
    {
      this.points++;
      this.palabraAnterior = this.palabraEscrita.join("").toLowerCase();
      this.palabraEscrita = [];
      this.segundos = 0;
    }
    else
    {
      this.finalizarJuego();
    }

  }

  finalizarJuego()
  {
    this.toast.showError('¡Perdiste!','Alcanzaste ' + this.points + ' puntos.');
    clearInterval(this.intervalo);
    if(this.datosUsuario.palabrasEncadenadas < this.points)
    {
      this.datosUsuario.palabrasEncadenadas = this.points;
      this.firestore.updateDocument(this.datosUsuario.id,this.datosUsuario,'datosDeJuegos');
    }

    setTimeout(() => 
    {
      this.juegoIniciado = false;
    }, 3000)
  }

  borrar()
  {
    this.palabraEscrita.pop();
  }

  irAlChat()
  {
    this.router.navigateByUrl('/chat');
  }

  irAlHome()
  {
    clearInterval(this.intervalo);
    this.router.navigateByUrl('/home');
  }

  juegoIniciado : boolean = false;
  points : number = 0;

  comenzarJuego()
  {
    this.segundos = 0;
    this.points = 0;
    this.reiniciarDatos();
    this.juegoIniciado = true;

    this.intervalo = setInterval(() => {
      console.log(`Tiempo transcurrido: ${this.segundos} segundos`);
      this.segundos++;
      if(this.segundos == 10)
      {
        this.finalizarJuego();
        clearInterval(this.intervalo);
      }
    }, 1000); // 1000 ms = 1 segundo
  }

  reiniciarDatos()
  {
    this.points = 0;
    this.palabraAnterior = this.palabras[Math.floor(Math.random() * this.palabras.length)]
    this.palabraEscrita = [];
  }


}
