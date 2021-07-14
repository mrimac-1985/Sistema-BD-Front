import { ReporteService } from './../../util/reporte.service';
import { TableService } from './../../_service/table.service';
import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/_model/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    public tableservice :  TableService,
    public reporteservicio : ReporteService

  ) { }

  ngOnInit(): void {
  }


  listartablas(){
    
  }


  descargartabla(){

    let tabla : Table = new Table();
    tabla.name ="Usp_Conv_Adm_ModificarConvenioMigraciones";

    this.tableservice.descargartabla(tabla).subscribe(respuestabase => {

      this.reporteservicio.descargarArchivo(respuestabase.data[0].reporte, respuestabase.data[0].nombreArchivo,respuestabase.data[0].extension);
    });
    
  }

}
