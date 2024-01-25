import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Assignment} from "../../shared/models/assignement.model";
import {AssignmentsService} from "../../shared/services/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {query} from "@angular/animations";
import {AuthService} from "../../shared/services/auth.service";
import {user} from "../../shared/models/users.model";

@Component({
    selector: 'app-assignment-detail',
    templateUrl: './assignment-detail.component.html',
    styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
    assignementTransmis?: Assignment;
    @Output() onDelete = new EventEmitter<Assignment>();
    @Output() detailVisibleChange = new EventEmitter<boolean>();
    @Input() detailVisible?: boolean;
    @Input() user?: user;
    photoProfesseur?: string;

    constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    }

    image?: string;

    ngOnInit(): void {
        this.getAssignment();
        console.log(this.assignementTransmis);
        console.log(this.detailVisible);
    }

    assignementRendu(): void {
        if (this.assignementTransmis) {
            this.assignementTransmis.rendu = true;

            let updatedAssignment: any = {
                ...this.assignementTransmis
            };

            if (typeof this.assignementTransmis.matiere === 'object' && this.assignementTransmis.matiere?._id) {
                updatedAssignment.matiere = this.assignementTransmis.matiere._id;
            }

            if (typeof this.assignementTransmis.eleve === 'object' && this.assignementTransmis.eleve?._id) {
                updatedAssignment.eleve = this.assignementTransmis.eleve._id;
            }
            this.assignmentsService.updateAssignments(updatedAssignment).subscribe(message => {
                console.log(message);
                this.router.navigate([this.router.url]);
            });
        }
    }

    onDeleteAssignment(): void {
        if (this.assignementTransmis) {
            const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer ce devoir ?");
            if (isConfirmed) {
                this.detailVisible = false
                this.detailVisibleChange.emit(this.detailVisible);
                this.assignmentsService.deleteAssignments(this.assignementTransmis).subscribe(message => {
                    console.log(message);
                    alert("Votre devoir est supprimé !");
                    this.router.navigate(['/home']);
                });
            } else {
                console.log("Suppression annulée");
            }
        }
    }

    getAssignment() {
        const id = +this.route.snapshot.params['id'];
        this.assignmentsService.getAssignment(id).subscribe(assignment => {
            this.assignementTransmis = assignment;
            if (assignment && assignment.matiere && assignment.matiere.image && assignment.matiere.photoProfesseur) {
                this.image = "assets/matiere/" + assignment.matiere.image;
                this.photoProfesseur = "assets/prof/" + assignment.matiere.photoProfesseur;
            }
        });
    }


    onClickEdit() {
        this.router.navigate(['/assignement', this.assignementTransmis?.id, 'edit'], {
            queryParams: {nom: this.assignementTransmis?.nom},
            fragment: 'edition'
        })
    }

    isAdmin(): boolean {
        return this.authService.Admin;
    }

    sidenavOpended = true;

    onToggleSidenav() {
        this.sidenavOpended = !this.sidenavOpended;
    }

}
