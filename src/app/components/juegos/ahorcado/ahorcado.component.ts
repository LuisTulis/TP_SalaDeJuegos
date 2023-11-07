import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent 
{
  alphabet: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  wordToGuess: string = ""; // Palabra a adivinar (puedes cambiarla)
  guessedWord: string[] = [];
  usedLetters: string[] = [];
  attempts: number = 0;
  points : number = 0;
  pathFoto = "../../../../assets/hangman-0.png";
  palabras : string[];
  limiteLetras : number = 5;
  numeroPalabra : number = 0;
  juegoIniciado = false;
  
  usuarioActual : any;
  datosUsuario : any;

  constructor(private api : ApiService, private auth : AuthService, private router : Router, private toast : ToastService, private firestore : FirestoreService) 
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

    this.palabras = [];
    api.getData('https://raw.githubusercontent.com/javierarce/palabras/master/listado-general.txt').subscribe(datos =>
    {
      this.palabras = datos;
    });
  }

  guessLetter(letter: string) 
  {
    if(this.wordToGuess.includes(letter)) 
    {
      this.updateGuessedWord(letter);
    } 
    else 
    {
      this.usedLetters.push(letter);
      this.attempts++;
      this.pathFoto = '../../../../assets/hangman-' + this.attempts.toString() + '.png';

      if(this.attempts == 7)
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
        }, 3000)
      }
    }
  }

  initializeGuessedWord() 
  {
    this.guessedWord = this.wordToGuess.split('').map(_ => '_ ');
  }

  updateGuessedWord(letter: string) {
    for (let i = 0; i < this.wordToGuess.length; i++) 
    {
      if (this.wordToGuess[i] === letter) 
      {
        this.guessedWord[i] = letter;
      }
    }

    if(this.guessedWord.join('') == this.wordToGuess)
    {
      this.toast.showSuccess('¡Correcto!','Sumas un punto.');
      setTimeout(() => 
      {
        this.points ++;
        this.reiniciarDatos();
        
      }, 1000)
    }
  }

  getPalabra() : string
  {
    let palabraRetorno = "";

    while(!(palabraRetorno.length > 3 && palabraRetorno.length <= (5 + this.points * 0.25)))
    {
      let numeroPalabra = parseInt((Math.random() * this.palabras.length).toString());
      palabraRetorno = this.palabras[numeroPalabra];
    }

    palabraRetorno = palabraRetorno.replace(/[áÁ]/g, 'a')
    .replace(/[éÉ]/g, 'e')
    .replace(/[íÍ]/g, 'i')
    .replace(/[óÓ]/g, 'o')
    .replace(/[úÚ]/g, 'u');
    
    console.log(palabraRetorno);
    console.log(5 + this.points * 0.25);
    
    return palabraRetorno.toUpperCase();
  }

  irAlChat()
  {
    this.router.navigateByUrl('/chat');
  }

  irAlHome()
  {
    this.router.navigateByUrl('/home');
  }

  comenzarJuego()
  {
    this.points = 0;
    this.reiniciarDatos();
    this.juegoIniciado = true;
  }

  reiniciarDatos()
  {
    this.wordToGuess = this.getPalabra();
    this.initializeGuessedWord();
    this.attempts = 0;
    this.usedLetters = [];
    this.pathFoto = '../../../../assets/hangman-' + this.attempts.toString() + '.png';
  }

}