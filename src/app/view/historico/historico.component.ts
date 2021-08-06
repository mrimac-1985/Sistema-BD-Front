import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcedureService } from 'src/app/_service/procedure.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  nombretitulo : string;

  constructor(
    private dialogo: MatDialogRef<HistoricoComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: any,
    public procedureservice : ProcedureService
  ) { }

  ngOnInit(): void {

    this.nombretitulo ="Historico de Objetos";  
  }


  cerrarDialogo(){
    this.dialogo.close();
  }

}
