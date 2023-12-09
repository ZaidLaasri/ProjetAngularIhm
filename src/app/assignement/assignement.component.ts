import {Component, OnInit} from '@angular/core';
import {Assignment} from "./assignement.model";
import {AssignmentsService} from "../shared/assignments.service"
import {user} from "../shared/users.model";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-assignement',
    templateUrl: './assignement.component.html',
    styleUrls: ['./assignement.component.css']
})
export class AssignementComponent implements OnInit {
    tittre = "Zaid page"
    ajoutActive = false;
    formVisible = false;
    dateDevoir: any;
    nomDevoir: any;
    renduDevoir: any;

    assignementSelectionne?: Assignment;

    colorActive = "green";
    detailVisible = false
    assignements: Assignment[] = []

    constructor(private assignmentsService: AssignmentsService, private authService:AuthService, private router:Router) {
    }

    user?: user;

    reloadApp() {
        this.authService.reset();
        this.router.navigate(['/logging'])
    }

    ngOnInit(): void {

        this.getAssignments();
        setTimeout(() => {
            this.ajoutActive = true;
            this.colorActive = "blue";

        }, 3000);
    }

    getAssignments() {
        this.assignmentsService.getAssignments().subscribe(assignments => this.assignements = assignments)
    }

    assignmentClique(assignment: Assignment) {
        this.detailVisible = true;
        this.assignementSelectionne = assignment;
    }

    onAddAssignement(): void {
        this.formVisible = true;
    }

    onlistAssignement(): void {
        this.formVisible = false;
    }

    /*
      onNewAssignement(event: Assignment): void {
       // this.assignements.push(event);
        this.assignmentsService.addAssignments(event).subscribe(message => console.log(message))
        this.formVisible = false;
      }
     */
  sidenavOpended=true;
  onToggleSidenav() {
   this.sidenavOpended=!this.sidenavOpended;
  }

  deleteAssignment(event: Assignment): void {
        /*const index = this.assignements.indexOf(event);
         if (index !== -1) {
           this.assignements.splice(index, 1);
         }
         */
        //this.assignmentsService.deleteAssignments(event).subscribe(message => console.log(message))
    }
}
