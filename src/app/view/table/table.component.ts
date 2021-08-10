import { ScripttableComponent } from './scripttable/scripttable.component';
import { ReporteService } from './../../util/reporte.service';
import { TableService } from './../../_service/table.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'src/app/_model/table';
import { Pageable } from 'src/app/util/pageable';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  /*BUSCAR */
  formBuscar: FormGroup;

  public dataSource: MatTableDataSource<Table>;
  public cantidad: number = 0;
  displayedColumns: string[] = [
    'Id',
    'Esquema',
    'Nombre',
    'Fecha_Creacion',
    'Fecha_Modificacion',
    'Accion',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public tableservice: TableService,
    public reporteservicio: ReporteService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {

    this.formBuscar = this.formBuilder.group({
      palabraclave:  new FormControl('')  
    });

    this.listartablas();
  }

  listartablas() {
    let pagina: Pageable = new Pageable();

    pagina.pagenumber = 0;
    pagina.pagesize = 10;
    pagina.palabraclave = '';

    this.tableservice.listartablas(pagina).subscribe((RespuestaBase) => {
      this.cantidad = RespuestaBase.data[0].totalElements;
      this.dataSource = new MatTableDataSource(RespuestaBase.data[0].content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // descargartabla() {
  //   let tabla: Table = new Table();
  //   tabla.name = 'Usp_Conv_Adm_ModificarConvenioMigraciones';

  //   this.tableservice.descargartabla(tabla).subscribe((respuestabase) => {
  //     this.reporteservicio.descargarArchivo(
  //       respuestabase.data[0].reporte,
  //       respuestabase.data[0].nombreArchivo,
  //       respuestabase.data[0].extension
  //     );
  //   });
  // }

  mostrarMas(e?: any) {
    let pagina: Pageable = new Pageable();

    pagina.pagenumber = e.pageIndex * e.pageSize;
    pagina.pagesize = e.pageSize;
    pagina.palabraclave = '' + this.formBuscar.value['palabraclave'];

    this.tableservice.listartablas(pagina).subscribe((RespuestaBase) => {
      this.cantidad = RespuestaBase.data[0].totalElements;
      this.dataSource = new MatTableDataSource(RespuestaBase.data[0].content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  buscar() {
    let pagina: Pageable = new Pageable();

    pagina.pagenumber = 0;
    pagina.pagesize = 10;
    pagina.palabraclave = '' + this.formBuscar.value['palabraclave'];

    this.tableservice.listartablas(pagina).subscribe((RespuestaBase) => {
      this.cantidad = RespuestaBase.data[0].totalElements;
      this.dataSource = new MatTableDataSource(RespuestaBase.data[0].content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  verscript(table?: Table) {

    let table_ = table != null ? table : new Table();
       
    this.dialog.open(ScripttableComponent, {
      width: '800px',
      data: table_,
      disableClose: true 
    });
  }

  descargarhistorial(table?: Table) {}

  descargartabla(table: Table) {

    this.tableservice.descargartabla(table).subscribe(respuestabase => {

      this.reporteservicio.descargarArchivo(respuestabase.data[0].reporte, respuestabase.data[0].nombreArchivo,respuestabase.data[0].extension);
    });
  }



}
