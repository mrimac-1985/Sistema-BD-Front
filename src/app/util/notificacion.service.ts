import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionComponent } from './notificacion/notificacion.component';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {


  ruta_exito :string = "assets/iconos/ok.png";
  ruta_error :string = "assets/iconos/error.png";
  ruta_alera :string = "assets/iconos/warning.png";

  mensaje_exito : string ="ÉXITO";
  mensaje_alerta : string ="ALERTA!";
  mensaje_error : string ="ERROR!";


  constructor(private sackbar: MatSnackBar ) { }

  
  mostrarNotificacion(mensaje: string , buttonTexto :string , tipoMensaje : 'error'|'exito'|'alerta' ){


    let ruta_imagen : string = tipoMensaje == 'exito' ? this.ruta_exito :  tipoMensaje == 'error' ? this.ruta_error :  tipoMensaje == 'alerta' ? this.ruta_alera :  '';

    let titulomensaje  : string = tipoMensaje == 'exito' ? this.mensaje_exito :  tipoMensaje == 'error' ? this.mensaje_error :  tipoMensaje == 'alerta' ? this.mensaje_alerta :  '';

    this.sackbar.openFromComponent(NotificacionComponent, {
      data:{
        message:mensaje,
        buttonText:buttonTexto,
        type: titulomensaje,
        rutaimage: ruta_imagen
      },
      duration : 5000,
      horizontalPosition:'right',
      verticalPosition:'bottom',
      panelClass: tipoMensaje
    });
  }

  
}
