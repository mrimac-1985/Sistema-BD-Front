import { HistoricoComponent } from './../historico/historico.component';
import { ScriptprocedureComponent } from './scriptprocedure/scriptprocedure.component';
import { Pageable } from './../../util/pageable';
import { ProcedureService } from './../../_service/procedure.service';
import { Procedure } from './../../_model/procedure';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ReporteService } from 'src/app/util/reporte.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DDLEvents } from 'src/app/_model/ddlevents';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent implements OnInit {


  /*BUSCAR */
  formBuscar : FormGroup;


  

  public dataSource: MatTableDataSource<Procedure>;
  public cantidad: number  = 0;
  displayedColumns: string[] = ['Id', 'Esquema', 'Nombre','Fecha_Creacion','Fecha_Modificacion', 'Accion'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    public reporteservicio : ReporteService,
    public procedureservice : ProcedureService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.formBuscar = this.formBuilder.group({
      palabraclave:  new FormControl('')  
    });

    this.listarprocedimiento();
  }

  listarprocedimiento(){

    let pagina : Pageable = new Pageable();
     
    pagina.pagenumber =0;
    pagina.pagesize =10;
    pagina.palabraclave= "";

    this.procedureservice.listarprocedimiento(pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;            
      this.dataSource = new MatTableDataSource(RespuestaBase.data[0].content);      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  descargarprocedure(procedure? : Procedure ){

    this.procedureservice.descargarprocedure(procedure).subscribe(respuestabase => {

      this.reporteservicio.descargarArchivo(respuestabase.data[0].reporte, respuestabase.data[0].nombreArchivo,respuestabase.data[0].extension);
    });
    
  }
  

  mostrarMas(e?: any) {

    let pagina : Pageable = new Pageable();
     
    pagina.pagenumber =e.pageIndex*e.pageSize;
    pagina.pagesize =e.pageSize;
    pagina.palabraclave= ""+this.formBuscar.value['palabraclave'];

    this.procedureservice.listarprocedimiento(pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;            
      this.dataSource = new MatTableDataSource(RespuestaBase.data[0].content);      
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  buscar(){

    let pagina : Pageable = new Pageable();
     
    pagina.pagenumber =0;
    pagina.pagesize =10;
    pagina.palabraclave= ""+this.formBuscar.value['palabraclave'];

    this.procedureservice.listarprocedimiento(pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;            
      this.dataSource = new MatTableDataSource(RespuestaBase.data[0].content);      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  verscript(proc?: Procedure) {

  //let  procedure : Procedure = new Procedure();
  let procedure = proc != null ? proc : new Procedure();
       
  this.dialog.open(ScriptprocedureComponent, {
    width: '1300px',
    data: procedure,
    disableClose: true 
  });

  }


  descargarhistorial(procedure? : Procedure ){

       
    this.dialog.open(HistoricoComponent, {
      width: '1300px',
      data: procedure,
      disableClose: true 
    });



    // let dato : DDLEvents = new DDLEvents();

    // dato.objectname='Usp_Conv_Adm_NombreMetodo_XXX'

    // this.procedureservice.descargarhistorial(dato).subscribe(respuestabase => {

    //   this.reporteservicio.descargarArchivo(respuestabase.data[0].reporte, respuestabase.data[0].nombreArchivo,respuestabase.data[0].extension);
    // });
    
  }


}
