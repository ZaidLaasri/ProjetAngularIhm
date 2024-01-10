import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssignmentsService} from "../../shared/assignments.service";
import {Assignment} from "../../shared/models/assignement.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignementTransmis?: Assignment;
  @Output() onDelete = new EventEmitter<Assignment>();
  @Output() detailVisibleChange = new EventEmitter<boolean>();
  @Input() detailVisible?: boolean;

  dateDevoir: any;
  nomDevoir: any;
  renduDevoir: any;
  noteDevoir: any

  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  reloadApp() {
    this.authService.reset();
    this.router.navigate(['/logging'])
  }

  ngOnInit(): void {
    this.getAssignment();


    console.log(this.assignementTransmis);
    console.log(this.detailVisible);

  }

  assignementRendu(): void {
    if (this.assignementTransmis) {
      this.assignmentsService.assignmentsRendu(this.assignementTransmis).subscribe(message => console.log(message))
      this.router.navigate(['/home'])
    }
  }

  sidenavOpended = true;

  onToggleSidenav() {
    this.sidenavOpended = !this.sidenavOpended;
  }

  onDeleteAssignment(): void {
    if (this.assignementTransmis) {
      this.detailVisible = false
      this.detailVisibleChange.emit(this.detailVisible);
      //  this.onDelete.emit(this.assignementTransmis);
      this.assignmentsService.deleteAssignments(this.assignementTransmis).subscribe(message => {
        console.log(message)
        this.router.navigate(['/home'])
      })
    }


  }

  onSaveAssignment(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if (!this.assignementTransmis) return;

    // Créer un nouvel objet avec la structure attendue par le serveur
    let updatedAssignment: any = {
      ...this.assignementTransmis,
      nom: this.nomDevoir,
      dateRendu: new Date(this.dateDevoir),
      note: parseInt(this.noteDevoir),
      rendu: this.renduDevoir,
    };

    // Vérifier si 'matiere' est un objet et a une propriété 'id'
    if (typeof this.assignementTransmis.matiere === 'object' && this.assignementTransmis.matiere?.id) {
      updatedAssignment.matiere = this.assignementTransmis.matiere.id;
    }

    // De même pour 'eleve'
    if (typeof this.assignementTransmis.eleve === 'object' && this.assignementTransmis.eleve?.id) {
      updatedAssignment.eleve = this.assignementTransmis.eleve.id;
    }

    this.assignmentsService.updateAssignments(updatedAssignment).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      this.assignementTransmis = assignment;
      // Assurez-vous que ces assignations se font après la réception de l'assignment
      this.nomDevoir = this.assignementTransmis?.nom;
      this.dateDevoir = this.assignementTransmis?.dateRendu; // Convertissez en objet Date si nécessaire
      this.noteDevoir = this.assignementTransmis?.note;
      this.renduDevoir = this.assignementTransmis?.rendu;
    });
  }
}
