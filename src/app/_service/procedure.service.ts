import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pageable } from '../util/pageable';
import { Procedure } from '../_model/procedure';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
 
  
  url: string = `${environment.HOST}/bdcontroller`;
  
  constructor(
    private http : HttpClient
  ) { }

  descargarprocedure(procedure: Procedure | undefined) {
    return this.http.post<any>(this.url+'/descargarprocedure', procedure);
  }

  listarprocedimiento(pagina: Pageable) {
    return this.http.post<any>(this.url+'/listarprocedimiento', pagina);
  }

  cargarscriptprocedure(procedure: Procedure) {
    return this.http.post<any>(this.url+'/cargarscriptprocedure', procedure);
  }


  descargarhistorial(dato: any) {
    return this.http.post<any>(this.url+'/descargarhistorial', dato);
  }
 
  
}
