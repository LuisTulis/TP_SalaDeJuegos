import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService 
{

  constructor(private httpClient : HttpClient) { }
  
  getData(apiUrl : string): Observable<string[]> 
  {
    const datos = this.httpClient.get(apiUrl, { responseType: 'text' })
    .pipe(map(data => data.split('\n')));
    console.log(datos);
    return datos;
  }

}
