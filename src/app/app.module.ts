import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ChartsModule } from 'ng2-charts';
import { NotificacionComponent } from './util/notificacion/notificacion.component';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './view/home/home.component';
import { TableComponent } from './view/table/table.component';
import { ProcedureComponent } from './view/procedure/procedure.component';
import { ViewsComponent } from './view/views/views.component';
import { ScriptprocedureComponent } from './view/procedure/scriptprocedure/scriptprocedure.component';
import { ScripttableComponent } from './view/table/scripttable/scripttable.component';
import { HistoricoComponent } from './view/historico/historico.component';
import { HistProcedureComponent } from './view/procedure/hist-procedure/hist-procedure.component';
import { FunctionComponent } from './view/function/function.component';



@NgModule({
  declarations: [
    AppComponent,
    NotificacionComponent,
    LoginComponent,
    HomeComponent,
    TableComponent,
    ProcedureComponent,
    ViewsComponent,
    ScriptprocedureComponent,
    ScripttableComponent,
    HistoricoComponent,
    HistProcedureComponent,
    FunctionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule,
    NgProgressModule.withConfig({
      spinnerPosition: "right",
      color: "#ff0000"
    }),
    NgProgressHttpModule,
    NgxExtendedPdfViewerModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
