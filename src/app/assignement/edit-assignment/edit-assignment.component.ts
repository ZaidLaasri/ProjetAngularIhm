import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssignmentsService} from "../../shared/services/assignments.service";
import {Assignment} from "../../shared/models/assignement.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  parentFormGroup: FormGroup;
  matiereId: any;

  constructor(private _formBuilder: FormBuilder, private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.parentFormGroup = this._formBuilder.group({
      firstFormGroup: new FormGroup({}),
      secondFormGroup: new FormGroup({}),
      thirdFormGroup: new FormGroup({}),
    });
  }



  ngOnInit(): void {
    this.parentFormGroup = this._formBuilder.group({
      firstFormGroup: this._formBuilder.group({
        nomDevoir: ['', Validators.required],
        dateDevoir: ['', Validators.required],
        noteDevoir: ['', Validators.required],
        renduDevoir: [false]
      }),
      secondFormGroup: this._formBuilder.group({}),
      thirdFormGroup: this._formBuilder.group({}),
    });
    this.getAssignment();
  }

  get firstFormGroup(): FormGroup {
    const formGroup = this.parentFormGroup.get('firstFormGroup');
    if (formGroup instanceof FormGroup) {
      return formGroup;
    } else {
      throw new Error('firstFormGroup is not a FormGroup');
    }
  }

  selectedEleveId?: string;
  onEleveIdReceived(id: string) {
    this.selectedEleveId = id;
  }

  selectedMatiereId?: string;
  onMatiereIdReceived(id: string) {
    this.selectedMatiereId = id;
  }

  onSave() {
    let updatedAssignment: any = {
      ...this.assignementTransmis,
      nom: this.firstFormGroup.value.nomDevoir,
      dateRendu: new Date(this.firstFormGroup.value.dateDevoir),
      note: this.firstFormGroup.value.noteDevoir,
      rendu: this.firstFormGroup.value.renduDevoir,
      matiere: this.selectedMatiereId,
      eleve: this.selectedEleveId,
    };

    this.assignmentsService.updateAssignments(updatedAssignment).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home'])
    });
  }


  sidenavOpended = true;

  onToggleSidenav() {
    this.sidenavOpended = !this.sidenavOpended;
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
