import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent 
{
  constructor(private auth : AuthService, private router : Router)
  {}


  usuarioActual : any;

  navigateToHome()
  {
    this.router.navigateByUrl('/home');
  }

}
