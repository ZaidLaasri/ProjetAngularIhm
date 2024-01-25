import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Matiere} from "../../../shared/models/matiere.model";
import {MatiereService} from "../../../shared/services/matiere.service";
import {Assignment} from "../../../shared/models/assignement.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-formulaire-matiere',
  templateUrl: './formulaire-matiere.component.html',
  styleUrls: ['./formulaire-matiere.component.css']
})
export class FormulaireMatiereComponent implements OnInit {
  @Input() assignementTransmis?: Assignment;
  formGroup?: FormGroup;
  @Output() matiereId = new EventEmitter<string>();

  constructor(private _formBuilder: FormBuilder, private matiereService: MatiereService) {
    this.formGroup = this._formBuilder.group({
      nomMatiereSelect: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getMatieres();
    this.initFormGroup();
    this.updateForm();
    if (this.assignementTransmis?.matiere) {
      this.updateFormWithMatiere(this.assignementTransmis.matiere);
      this.onMatiereSelected(this.assignementTransmis.matiere._id)
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assignementTransmis'] && this.assignementTransmis) {
      this.updateForm();
      this.formGroup?.patchValue({
        nomMatiereSelect: this.assignementTransmis.matiere?.nom,
      });
    }
  }

  updateForm(): void {
    this._id=this.assignementTransmis?.matiere?._id
    if (this.formGroup) {
      this.professeur = this.assignementTransmis?.matiere?.professeur;
      this.nomMatiere = this.assignementTransmis?.matiere?.nom;
      this.photoProfesseur= "assets/prof/"+this.assignementTransmis?.matiere?.photoProfesseur;
      this.image ="assets/matiere/" +this.assignementTransmis?.matiere?.image;
    }
  }


  initFormGroup(): void {
    this.formGroup = this._formBuilder.group({
      nomMatiereSelect: ['', Validators.required],
    });

    this.formGroup.get('nomMatiereSelect')?.valueChanges.subscribe(selectedMatiere => {
      const matiere = this.matieres?.find(m => m.nom === selectedMatiere);
      if (matiere) {
        this.updateFormWithMatiere(matiere);
      }
    });
  }
  updateFormWithMatiere(matiere: Matiere): void {
    this._id=matiere._id;
    this.professeur=matiere.professeur,
    this.photoProfesseur = "assets/prof/" + matiere.photoProfesseur;
    this.image = "assets/matiere/" + matiere.image;
    this.onMatiereSelected(this._id)
  }
  onMatiereSelected(id: string | undefined) {
    this.matiereId.emit(id);
  }
  matieres?: Matiere[];
  matiere?: Matiere;
  nomMatiere: any;
  image: any;
  professeur: any;
  photoProfesseur: any;
  _id:any;

  getMatieres() {
    this.matiereService.getMatieres().subscribe(matieres => {
      this.matieres = matieres;
    });
  }
}
