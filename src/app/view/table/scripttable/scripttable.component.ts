import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Table } from 'src/app/_model/table';
import { TableService } from 'src/app/_service/table.service';

@Component({
  selector: 'app-scripttable',
  templateUrl: './scripttable.component.html',
  styleUrls: ['./scripttable.component.css']
})
export class ScripttableComponent implements OnInit {


  
  script :string;
  nombreprocedimiento: string;
  
  constructor(
    private dialogo: MatDialogRef<ScripttableComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: Table,
    public tableservice: TableService,
  ) { }

  ngOnInit(): void {

    this.cargarscriptprocedure(this.data_dialog);
    this.nombreprocedimiento =  this.data_dialog.schema+'.'+this.data_dialog.name;
  }


  cargarscriptprocedure(data : Table){
    let procedure : Table = new Table();
    procedure = data;

    this.tableservice.cargarscripttable(procedure).subscribe(respuestabase =>{            
        this.script = respuestabase.data;        
    });

  }

  
  cerrarDialogo(){
    this.dialogo.close();
  }

}
