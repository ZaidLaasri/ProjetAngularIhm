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

  constructor(private _formBuilder: FormBuilder, private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.parentFormGroup = this._formBuilder.group({
      firstFormGroup: new FormGroup({
      }),
      secondFormGroup: new FormGroup({
      }),
    });
  }

  reloadApp() {
    this.authService.reset();
    this.router.navigate(['/logging'])
  }

  ngOnInit(): void {
    this.parentFormGroup = this._formBuilder.group({
      firstFormGroup: this._formBuilder.group({
        nomDevoir: ['', Validators.required],
        dateDevoir: ['', Validators.required],
        noteDevoir: ['', Validators.required],
        renduDevoir: [false]
      }),
      secondFormGroup:this._formBuilder.group({
        id:['', Validators.required],
      })
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

  get secondFormGroup(): FormGroup {
    const formGroup = this.parentFormGroup.get('secondFormGroup');
    if (formGroup instanceof FormGroup) {
      return formGroup;
    } else {
      throw new Error('firstFormGroup is not a FormGroup');
    }
  }
  onSave() {
    // Assurez-vous que les groupes de formulaires sont valides


    // Récupération des données des formulaires
    const firstGroupData = this.firstFormGroup.value;
    const secondGroupData = this.secondFormGroup.value;

    // Création de l'objet à enregistrer (exemple)
    const assignmentData = {
      ...firstGroupData,
      ...secondGroupData
      // ajoutez d'autres propriétés si nécessaire
    };

    console.log(firstGroupData);
  }


  /*
  onSaveAssignment() {
    // Empêcher le comportement par défaut du formulaire (si nécessaire)
    // event.preventDefault();

    // Vérifier si le formulaire est valide
    if (this.firstFormGroup.invalid) {
      return; // Arrêter l'exécution si le formulaire n'est pas valide
    }

    // Utiliser les valeurs du FormGroup
    const formValue = this.firstFormGroup.value;
    let updatedAssignment: any = {
      ...this.assignementTransmis,
      nom: formValue.nomDevoir,
      dateRendu: new Date(formValue.dateDevoir),
      note: parseInt(formValue.noteDevoir),
      rendu: formValue.renduDevoir,
    };

    // Vérification pour 'matiere' et 'eleve'
    if (typeof this.assignementTransmis?.matiere === 'object' && this.assignementTransmis.matiere?.id) {
      updatedAssignment.matiere = this.assignementTransmis.matiere.id;
    }
    if (typeof this.assignementTransmis?.eleve === 'object' && this.assignementTransmis.eleve?.id) {
      updatedAssignment.eleve = this.assignementTransmis.eleve.id;
    }

    // Appel au service pour la mise à jour
    this.assignmentsService.updateAssignments(updatedAssignment).subscribe(message => {
      console.log(message);
    });
  }*/

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

  protected readonly FormGroup = FormGroup;
}
