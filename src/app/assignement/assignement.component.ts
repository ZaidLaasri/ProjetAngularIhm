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
    dateDevoir: any;
    nomDevoir: any;
    renduDevoir: any;

    dataSource?: MatTableDataSource<Assignment>;
    displayedColumns: string[] = ['photoProf', 'nom', 'dateRendu', 'rendu', 'note', 'matiere', 'eleve'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null = null;

    constructor(private assignmentsService: AssignmentsService, private authService: AuthService, private router: Router) {
    }


    ngOnInit(): void {
        this.getAssignments2();
    }

    getAssignments2() {
        this.assignmentsService.getAssignments().subscribe(assignments => {
            this.dataSource = new MatTableDataSource(assignments);
            if (this.paginator) {
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    textFilter: string = '';
    checkboxFilter: boolean = false;

    applyFilter(event: MatCheckboxChange): void {
        this.checkboxFilter = event.checked;
        this.applyCombinedFilters();
    }

    applySearche(event: Event) {
        this.textFilter = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.applyCombinedFilters();
    }

    applyCombinedFilters() {
        if (this.dataSource) {
            this.dataSource.filterPredicate = (data: Assignment, filter: string) => {
                console.log('Data:', data);
                const textMatch = data.nom ? data.nom.toLowerCase().includes(this.textFilter) : false;
                console.log('Text Match:', textMatch);
                const checkboxMatch = this.checkboxFilter ? (data.rendu === true) : true;
                console.log('Checkbox Match:', checkboxMatch);
                return textMatch && checkboxMatch;
            };
            this.dataSource.filter = 'apply';
            if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
            }
        }
    }

    sidenavOpended = true;

    onToggleSidenav() {
        this.sidenavOpended = !this.sidenavOpended;
    }
}
