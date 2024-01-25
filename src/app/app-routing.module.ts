import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentAddComponent } from './assignement/assignment-add/assignment-add.component';
import {AssignementComponent} from "./assignement/assignement.component";
import {AssignmentDetailComponent} from "./assignement/assignment-detail/assignment-detail.component";
import {EditAssignmentComponent} from "./assignement/edit-assignment/edit-assignment.component";
import {AuthGuard} from "./shared/services/auth.guard";
import {AssignmentLoggingComponent } from "./assignement/assignment-logging/assignment-logging.component";
import {AuthAdminGuard} from "./shared/services/auth-admin.guard";

const routes: Routes = [
  { path: '', component: AssignementComponent },
  { path: 'add', component: AssignmentAddComponent, canActivate:[AuthGuard] },
  { path: 'home', component: AssignementComponent },
  { path: 'assignement/:id', component: AssignmentDetailComponent,canActivate:[AuthGuard]},
  { path: 'assignement/:id/edit', component: EditAssignmentComponent, canActivate:[AuthGuard] },
  { path: 'logging', component: AssignmentLoggingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
