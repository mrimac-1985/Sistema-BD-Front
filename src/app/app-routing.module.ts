import { ViewsComponent } from './view/views/views.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { ProcedureComponent } from './view/procedure/procedure.component';
import { TableComponent } from './view/table/table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoricoComponent } from './view/historico/historico.component';
import { FunctionComponent } from './view/function/function.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tabla', component: TableComponent },
  { path: 'vista', component: ViewsComponent},
  { path: 'procedimiento', component: ProcedureComponent },
  { path: 'funcion', component: FunctionComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
