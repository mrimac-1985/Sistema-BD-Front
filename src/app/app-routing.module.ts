import { LoginComponent } from './view/login/login.component';
import { ProcedureComponent } from './view/procedure/procedure.component';
import { TableComponent } from './view/table/table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'tabla', component: TableComponent },
  { path: 'procedimiento', component: ProcedureComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
