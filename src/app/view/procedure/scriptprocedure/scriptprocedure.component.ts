import { Procedure } from './../../../_model/procedure';
import { ProcedureService } from './../../../_service/procedure.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-scriptprocedure',
  templateUrl: './scriptprocedure.component.html',
  styleUrls: ['./scriptprocedure.component.css']
})
export class ScriptprocedureComponent implements OnInit {


  script :string;

  nombreprocedimiento: string;

  constructor(
    private dialogo: MatDialogRef<ScriptprocedureComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: Procedure,
    public procedureservice : ProcedureService
  ) { }

  ngOnInit(): void {

    this.cargarscriptprocedure(this.data_dialog);
    this.nombreprocedimiento =  this.data_dialog.schema+'.'+this.data_dialog.name;

  }


  cargarscriptprocedure(data : Procedure){
    let procedure : Procedure = new Procedure();
    procedure = data;

    this.procedureservice.cargarscriptprocedure(procedure).subscribe(respuestabase =>{            
        this.script = respuestabase.data;        
    });

  }

  
  cerrarDialogo(){
    this.dialogo.close();
  }

}
