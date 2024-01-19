import {Component, OnInit, ViewChild} from '@angular/core';
import {Assignment} from "../shared/models/assignement.model";
import {AssignmentsService} from "../shared/services/assignments.service"
import {user} from "../shared/models/users.model";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {filter} from "rxjs";
import {MatCheckboxChange} from "@angular/material/checkbox";


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
    dataSource?: MatTableDataSource<Assignment>;
    displayedColumns: string[] = ['nom', 'dateRendu', 'rendu', 'note', 'matiere', 'eleve'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null = null;

    constructor(private assignmentsService: AssignmentsService, private authService: AuthService, private router: Router) {
    }

    user?: user;

    reloadApp() {
        this.authService.reset();
        this.router.navigate(['/logging'])
    }

    ngOnInit(): void {

        this.getAssignments2();
        setTimeout(() => {
            this.ajoutActive = true;
            this.colorActive = "blue";

        }, 3000);


    }


    currentPage: number = 0;
    pageSize: number = 10;

    getAssignments2() {
        let start = this.currentPage * this.pageSize;
        this.assignmentsService.getAssignments(start, this.pageSize, this.filterValue, this.searchValue)
            .subscribe(assignments => {
                this.dataSource = new MatTableDataSource(assignments);
                if (this.paginator) {
                    this.dataSource.paginator = this.paginator;
                }
            });
    }

    searchValue = '';

    applySearch(event: Event): void {
        this.searchValue = (event.target as HTMLInputElement).value;
        this.getAssignments2(); // Recharger les données avec le nouveau critère de recherche
    }

    // Appelé lorsque l'utilisateur change de page ou modifie le nombre d'éléments par page
    onPaginateChange(event: PageEvent) {
        this.currentPage = event.pageIndex; // Définir l'index de la page actuelle
        this.pageSize = event.pageSize; // Définir la taille de la page actuelle
        this.getAssignments2(); // Recharger les données pour la page sélectionnée
    }




    filterValue = false
    applyFilter(event: MatCheckboxChange): void {
         this.filterValue = event.checked;
        if (this.dataSource) {
            this.dataSource.filter = this.filterValue ? 'true' : '';
        }
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
    sidenavOpended = true;

    onToggleSidenav() {
        this.sidenavOpended = !this.sidenavOpended;
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
