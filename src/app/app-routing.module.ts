import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentAddComponent } from './assignement/assignment-add/assignment-add.component';
import {AssignmentListComponent} from "./assignement/assignment-list/assignment-list.component";
import {AssignementComponent} from "./assignement/assignement.component";
import {AssignmentDetailComponent} from "./assignement/assignment-detail/assignment-detail.component";
import {EditAssignmentComponent} from "./assignement/edit-assignment/edit-assignment.component";
import {AuthGuard} from "./shared/auth.guard";
import {AssignmentLoggingComponent } from "./assignement/assignment-logging/assignment-logging.component";
import {AuthAdminGuard} from "./shared/auth-admin.guard";

const routes: Routes = [
  { path: '', component: AssignementComponent },
  { path: 'add', component: AssignmentAddComponent },
  { path: 'home', component: AssignementComponent },
  { path: 'assignement/:id', component: AssignmentDetailComponent,canActivate:[AuthGuard]},
  { path: 'assignement/:id/edit', component: EditAssignmentComponent, canActivate:[AuthAdminGuard] },
  { path: 'logging', component: AssignmentLoggingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }