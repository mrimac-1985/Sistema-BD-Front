import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pageable } from 'src/app/util/pageable';
import { ReporteService } from 'src/app/util/reporte.service';
import { Procedure } from 'src/app/_model/procedure';
import { ProcedureService } from 'src/app/_service/procedure.service';
import { HistProcedureComponent } from '../procedure/hist-procedure/hist-procedure.component';
import { ScriptprocedureComponent } from '../procedure/scriptprocedure/scriptprocedure.component';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

  
  /*BUSCAR */
  formBuscar : FormGroup; 
  tipobusqueda : string  = '@coincidencia@';  

  operacionSeleccionada: string = 'Palabra Coincidencia';
  tipoOperaciones = [
    'Palabra Coincidencia',
    'Solo palabra completa',
    'Buscar en script'
  ];


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
 
    switch (this.operacionSeleccionada) {
      case 'Palabra Coincidencia':
        this.tipobusqueda = "@coincidencia@";
        break;
      case 'Solo palabra completa':
        this.tipobusqueda = "@@@completa@@@";
        break;
      case 'Buscar en script':
        this.tipobusqueda = "@@@@script@@@@";
        break;
    }

    let pagina : Pageable = new Pageable();
    pagina.pagenumber =e.pageIndex*e.pageSize;
    pagina.pagesize =e.pageSize;
    pagina.palabraclave= ""+this.tipobusqueda+this.formBuscar.value['palabraclave'];

    this.procedureservice.listarprocedimiento(pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;            
      this.dataSource = new MatTableDataSource(RespuestaBase.data[0].content);      
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  buscar(){
  
    switch (this.operacionSeleccionada) {
      case 'Palabra Coincidencia':
        this.tipobusqueda = "@coincidencia@";
        break;
      case 'Solo palabra completa':
        this.tipobusqueda = "@@@completa@@@";
        break;
      case 'Buscar en script':
        this.tipobusqueda = "@@@@script@@@@";
        break;
    }

    let pagina : Pageable = new Pageable();
    pagina.pagenumber =0;
    pagina.pagesize =10;
    pagina.palabraclave= ""+this.tipobusqueda+this.formBuscar.value['palabraclave'];
    
    this.procedureservice.listarprocedimiento(pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;            
      this.dataSource = new MatTableDataSource(RespuestaBase.data[0].content);      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  verscript(pro : Procedure) {
  

    let procedimiento : Procedure = new Procedure();
    procedimiento = pro

    this.dialog.open(ScriptprocedureComponent, {
      width: '1300px',
      data: procedimiento,
      disableClose: true 
    });
 
 
  }

 
   
    
   

  descargarhistorial(procedure : Procedure ){

    let nombreobjeto : string = procedure.name;
       
    this.dialog.open(HistProcedureComponent, {
      width: '1400px',
      data: nombreobjeto,
      disableClose: true 
    });



    // let dato : DDLEvents = new DDLEvents();

    // dato.objectname='Usp_Conv_Adm_NombreMetodo_XXX'

    // this.procedureservice.descargarhistorial(dato).subscribe(respuestabase => {

    //   this.reporteservicio.descargarArchivo(respuestabase.data[0].reporte, respuestabase.data[0].nombreArchivo,respuestabase.data[0].extension);
    // });
    
  }



}
