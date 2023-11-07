import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastService } from 'src/app/services/toast.service';



@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit
{
  preguntas : any[];
  question : any;
  options : any[];
  
  points : number = 0;
  
  usuarioActual : any;
  datosUsuario : any;

  constructor(private api : ApiService, private auth : AuthService, private toast : ToastService, private router : Router, private firestore : FirestoreService)
  {
    this.preguntas = [];
    this.options = [];

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
  }

  ngOnInit(): void 
  {
    this.cargarPreguntas();
  }

  cargarPreguntas()
  {
    this.api.getData("https://opentdb.com/api.php?amount=50&difficulty=medium").subscribe(preguntas =>
    {
      this.preguntas = JSON.parse(preguntas[0]).results;
      this.preguntas.forEach((pregunta) => {
        pregunta.question = this.decodeHTMLEntities(pregunta.question);
        pregunta.incorrect_answers = pregunta.incorrect_answers.map((answer: string) => this.decodeHTMLEntities(answer));
        pregunta.correct_answer =this. decodeHTMLEntities(pregunta.correct_answer);
        
        this.seleccionarPregunta();
      });
    })
  }

  seleccionarPregunta()
  {
    this.question = this.preguntas[this.points];
    this.generarOpciones();
  }

  checkAnswer(selectedOption: string) {
    if (selectedOption === this.question.correct_answer) {
      this.points++;
      this.toast.showSuccess('Correcto','Siguiente pregunta...');
      this.seleccionarPregunta();
    } 
    else 
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
        
        this.cargarPreguntas();
      }, 3000)
    }
  }

  generarOpciones()
  {
    this.options = [...this.question.incorrect_answers, this.question.correct_answer];
    for (let i = this.options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.options[i], this.options[j]] = [this.options[j], this.options[i]];
    }
  }

  // Función personalizada para decodificar caracteres HTML escapados
  decodeHTMLEntities(input: string) 
  {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = input;
  return textarea.value;
  }

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

  irAlChat()
  {
    this.router.navigateByUrl('/chat');
  }

  irAlHome()
  {
    this.router.navigateByUrl('/home');
  }

}
