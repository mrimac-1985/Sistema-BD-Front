
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pageable } from 'src/app/util/pageable';
import { ReporteService } from 'src/app/util/reporte.service';
import { DDLEvents } from 'src/app/_model/ddlevents';
import { Procedure } from 'src/app/_model/procedure';
import { ProcedureService } from 'src/app/_service/procedure.service';
import { ScriptprocedureComponent } from '../scriptprocedure/scriptprocedure.component';

@Component({
  selector: 'app-hist-procedure',
  templateUrl: './hist-procedure.component.html',
  styleUrls: ['./hist-procedure.component.css']
})
export class HistProcedureComponent implements OnInit {

  nombretitulo : string;


  public dataSource: MatTableDataSource<DDLEvents>;
  public cantidad: number  = 0;
  displayedColumns: string[] = ['EventDate','EventType','Databaase','Schema','HostName','IPAddress','ProgramName','LoginName', 'Accion'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogo: MatDialogRef<HistProcedureComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any,
    public procedureservice : ProcedureService,
    public reporteservicio : ReporteService,
    private dialog: MatDialog,
  ) { }
 

  ngOnInit(): void {

    this.nombretitulo ="Historico de Objetos";  
    this.listarhistorial(this.data_dialog);
  }



  cerrarDialogo(){
    this.dialogo.close();
  }

  listarhistorial(data_dialog: any) {

    let pagina : Pageable = new Pageable();
     
    pagina.pagenumber =0;
    pagina.pagesize =10;
    pagina.palabraclave= data_dialog;

    this.procedureservice.listarhistorial(pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;            
      this.dataSource = new MatTableDataSource(RespuestaBase.data[0].content);      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    

  }



  mostrarMas(e?: any) {

    let pagina : Pageable = new Pageable();
     
    pagina.pagenumber =e.pageIndex*e.pageSize;
    pagina.pagesize =e.pageSize;
    pagina.palabraclave= this.data_dialog;

    this.procedureservice.listarhistorial(pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;            
      this.dataSource = new MatTableDataSource(RespuestaBase.data[0].content);      
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  descargarhistorial(ddlevent ? : DDLEvents){

    this.procedureservice.descargarhistorial(ddlevent).subscribe(respuestabase => {

      this.reporteservicio.descargarArchivo(respuestabase.data[0].reporte, respuestabase.data[0].nombreArchivo,respuestabase.data[0].extension);
    });
    
  }


  verscript(ddlevent   : DDLEvents){

    let ddlenvento : DDLEvents = new DDLEvents();
    ddlenvento=ddlevent;
 
    this.dialog.open(ScriptprocedureComponent, {
      width: '1300px',
      data: ddlenvento,
      disableClose: true 
    });


  }

  
}
