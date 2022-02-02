import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pageable } from '../util/pageable';

@Injectable({
  providedIn: 'root'
})
export class FuncionService {
  


  url: string = `${environment.HOST}/bdcontroller`;
  
  constructor(private http : HttpClient) { }

  listarfunciones(pagina: Pageable) {
    return this.http.post<any>(this.url+'/listarfunciones', pagina);
  }
  
}
