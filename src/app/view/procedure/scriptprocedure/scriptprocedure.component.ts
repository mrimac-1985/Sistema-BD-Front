import { Procedure } from './../../../_model/procedure';
import { ProcedureService } from './../../../_service/procedure.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DDLEvents } from 'src/app/_model/ddlevents';


@Component({
  selector: 'app-scriptprocedure',
  templateUrl: './scriptprocedure.component.html',
  styleUrls: ['./scriptprocedure.component.css']
})
export class ScriptprocedureComponent implements OnInit {




  nombreprocedimiento: string;
  script = [];
  scripttexto :string= ""; 

  constructor(
    private dialogo: MatDialogRef<ScriptprocedureComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any,
    public procedureservice : ProcedureService
  ) { }

  ngOnInit(): void {

    if(this.data_dialog.name != null){
      this.nombreprocedimiento =  this.data_dialog.schema+'.'+this.data_dialog.name;
      this.cargarscriptprocedure(this.data_dialog);

    }else if(this.data_dialog.objectname != null){
      
      this.nombreprocedimiento =  this.data_dialog.schemaname+'.'+this.data_dialog.objectname;
      this.cargarscripshistorico(this.data_dialog);
    }

  }


  cargarscriptprocedure(data : Procedure){
    let procedure : Procedure = new Procedure();
    procedure = data;
    let scriptresultado : string ;
    this.procedureservice.cargarscriptprocedure(procedure).subscribe(respuestabase =>{            
        this.scripttexto = respuestabase.data; 
    });
  }


  cargarscripshistorico(ddlevent : DDLEvents){
    let ddlevento : DDLEvents = new DDLEvents();
    ddlevento = ddlevent;
    let scriptresultado : string ;
    this.procedureservice.cargarscripshistorico(ddlevento).subscribe(respuestabase =>{            
        this.scripttexto = respuestabase.data; 
    });
  }


  
  cerrarDialogo(){
    this.dialogo.close();
  }

}
