import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pageable } from '../util/pageable';
import { DDLEvents } from '../_model/ddlevents';
import { Procedure } from '../_model/procedure';
import { Docsgd } from '../_model/sgddoc';

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
 

  listarhistorial(pagina: Pageable) {
    return this.http.post<any>(this.url+'/listarhistorial', pagina);
  }
  
  cargarscripshistorico(ddlevento: DDLEvents) {
    return this.http.post<any>(this.url+'/cargarscriptprocedurehistorico', ddlevento);
  }

  descargardoc(sgd: Docsgd) {
    return this.http.post<any>('http://localhost:8007/remitos/descargar', sgd);
  }


  descargardoc2():Observable<any> {
    return this.http.get('/v1/dni?numero=43449994');
  }

  

}
