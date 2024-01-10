import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { AssignementComponent } from './assignement/assignement.component';
import { RenduDirective } from './shared/directive/rendu.directive';
import { MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatNativeDateModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import { AssignmentDetailComponent } from './assignement/assignment-detail/assignment-detail.component';
import { AssignmentListComponent } from './assignement/assignment-list/assignment-list.component';
import { AssignmentAddComponent } from './assignement/assignment-add/assignment-add.component';
import { EditAssignmentComponent } from './assignement/edit-assignment/edit-assignment.component';
import { AssignmentLoggingComponent } from './assignement/assignment-logging/assignment-logging.component';
import {HttpClient} from "@angular/common/http";
import {HttpClientModule} from "@angular/common/http";
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { IsAdminDirective } from './shared/directive/is-admin.directive';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    AssignementComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AssignmentListComponent,
    AssignmentAddComponent,
    EditAssignmentComponent,
    AssignmentLoggingComponent,
    SidenavComponent,
    ToolbarComponent,
    IsAdminDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDividerModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule, HttpClientModule, MatTableModule, MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
