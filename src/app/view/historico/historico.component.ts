import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pageable } from 'src/app/util/pageable';
import { ReporteService } from 'src/app/util/reporte.service';
import { DDLEvents } from 'src/app/_model/ddlevents';
import { Procedure } from 'src/app/_model/procedure';
import { Docsgd } from 'src/app/_model/sgddoc';
import { ProcedureService } from 'src/app/_service/procedure.service';
import { ScriptprocedureComponent } from '../procedure/scriptprocedure/scriptprocedure.component';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  nombretitulo : string;


  public dataSource: MatTableDataSource<DDLEvents>;
  public cantidad: number  = 0;
  displayedColumns: string[] = ['EventDate','EventType','Databaase','Schema','HostName','IPAddress','ProgramName','LoginName', 'Accion'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
   // private dialogo: MatDialogRef<HistoricoComponent>,
    //@Inject(MAT_DIALOG_DATA) public data_dialog: any,
    public procedureservice : ProcedureService,
    public reporteservicio : ReporteService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.nombretitulo ="Historico de Objetos";  
    this.listarhistorial();
  }



 
  listarhistorial() {

    let pagina : Pageable = new Pageable();
     
    pagina.pagenumber =0;
    pagina.pagesize =10;
    pagina.palabraclave= "" ; //data_dialog;

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
    pagina.palabraclave= "";// this.data_dialog;

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


  descargar(){

    let rutaorigen : string ='D:/FUENTES_SIM/INSTALL/documentos4/Funcionarios/';
    let fechafinconsulta : string ='17/12/2021';

    //let listasgd : Docsgd[];

    var Docsgdlista = [ 
//  { 'sDni' : '42301207', 'sFechaIni' : '13/05/2016', 'sFechaFin' : fechafinconsulta, 'sRutaDescarga' : rutaorigen + '42301207' } 
// ,{ 'sDni' : '45917407', 'sFechaIni' : '02/07/2018', 'sFechaFin' : fechafinconsulta, 'sRutaDescarga' : rutaorigen + '45917407' } 
// ,{ 'sDni' : '44668592', 'sFechaIni' : '19/11/2018', 'sFechaFin' : fechafinconsulta, 'sRutaDescarga' : rutaorigen + '44668592' } 
 { 'bIncluyeAnexos' : true, 'sCoEmpleado' : '01164',  'sFechaInicio':'01/01/2017', 'sFechaFin':'31/12/2017', 'sRutaDescarga' : 'D:/SGD_DOC/APP/DESCARGAS/JMEREGILDO/REMITOS/2017' }  
,{ 'bIncluyeAnexos' : true, 'sCoEmpleado' : '01164',  'sFechaInicio':'01/01/2018', 'sFechaFin':'31/12/2018', 'sRutaDescarga' : 'D:/SGD_DOC/APP/DESCARGAS/JMEREGILDO/REMITOS/2018' } 
,{ 'bIncluyeAnexos' : true, 'sCoEmpleado' : '01164',  'sFechaInicio':'01/01/2019', 'sFechaFin':'31/12/2019', 'sRutaDescarga' : 'D:/SGD_DOC/APP/DESCARGAS/JMEREGILDO/REMITOS/2019' } 
,{ 'bIncluyeAnexos' : true, 'sCoEmpleado' : '01164',  'sFechaInicio':'01/01/2020', 'sFechaFin':'31/12/2020', 'sRutaDescarga' : 'D:/SGD_DOC/APP/DESCARGAS/JMEREGILDO/REMITOS/2020' } 
,{ 'bIncluyeAnexos' : true, 'sCoEmpleado' : '01164',  'sFechaInicio':'01/01/2021', 'sFechaFin':'31/12/2021', 'sRutaDescarga' : 'D:/SGD_DOC/APP/DESCARGAS/JMEREGILDO/REMITOS/2021' } 

  ];

    
  Docsgdlista.forEach(objeto=>{
    
    let sgd : Docsgd = new Docsgd( );
    sgd.bIncluyeAnexos = objeto.bIncluyeAnexos;
    sgd.sCoEmpleado=objeto.sCoEmpleado;
    sgd.sFechaInicio= objeto.sFechaInicio;
    sgd.sFechaFin= objeto.sFechaFin;
    sgd.sRutaDescarga= objeto.sRutaDescarga;

     this.procedureservice.descargardoc(sgd).subscribe(respuestabase =>{
       console.log(respuestabase)
     });
    
  });


    // let sgd : Docsgd = new Docsgd( );
    // sgd.sDni = '45601186';
    // sgd.sFechaIni='23/12/2015';
    // sgd.sFechaFin= fechafinconsulta;
    // sgd.sRutaDescarga=  rutaorigen + sgd.sDni;
    
    // this.procedureservice.descargardoc(sgd).subscribe(respuestabase =>{
    //   console.log(respuestabase)
    // });



    
  }
  
}
