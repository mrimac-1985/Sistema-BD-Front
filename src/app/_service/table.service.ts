import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pageable } from '../util/pageable';
import { Table } from '../_model/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {



  
  url: string = `${environment.HOST}/bdcontroller`;

  
  constructor(
    private http : HttpClient
  ) { }

  descargartabla(tabla: Table) {
    return this.http.post<any>(this.url+'/descargartabla', tabla);
  }


  listartablas(pagina: Pageable) {
    return this.http.post<any>(this.url+'/listartablas', pagina);
  }

  cargarscripttable(procedure: Table) {
    return this.http.post<any>(this.url+'/cargarscripttable', procedure);
  }


}
