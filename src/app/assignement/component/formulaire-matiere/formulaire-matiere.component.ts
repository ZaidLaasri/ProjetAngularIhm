import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
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
  @Input() formGroup?: FormGroup;


  constructor(private _formBuilder: FormBuilder, private matiereService: MatiereService) {
    this.formGroup = this._formBuilder.group({
      id: ['', Validators.required],
      nomMatiere:  ['', Validators.required],
      professeur: ['', Validators.required],
      nomMatiereSelect: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getMatieres();
    this.initFormGroup();
    this.updateForm();
    if (this.assignementTransmis?.matiere) {
      this.updateFormWithMatiere(this.assignementTransmis.matiere);
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
    this.id=this.assignementTransmis?.matiere?.id
    if (this.formGroup) {
      this.formGroup.patchValue({
        id: this.id,
      });
      this.professeur = this.assignementTransmis?.matiere?.professeur;
      this.nomMatiere = this.assignementTransmis?.matiere?.nom;
      this.photoProfesseur= "assets/prof/"+this.assignementTransmis?.matiere?.photoProfesseur;
      this.image ="assets/matiere/" +this.assignementTransmis?.matiere?.image;
    }

  }


  initFormGroup(): void {
    this.formGroup = this._formBuilder.group({
      id: 3 ,
      nomMatiere: ['', Validators.required],
      professeur: ['', Validators.required],
      nomMatiereSelect: ['', Validators.required],
    });

    this.formGroup.get('nomMatiereSelect')?.valueChanges.subscribe(selectedMatiere => {
      const matiere = this.matieres?.find(m => m.nom === selectedMatiere);
      if (matiere) {
        this.updateFormWithMatiere(matiere);
        this.formGroup?.patchValue({
          id: matiere.id // Mettre à jour l'id dans le FormGroup parent
        });

      }
    });
  }
  updateFormWithMatiere(matiere: Matiere): void {
    this.formGroup?.patchValue({
      id: matiere.id,
      nomMatiere: matiere.nom,
      professeur: matiere.professeur,
    });
    this.id=matiere.id;
    this.professeur=matiere.professeur,
    this.photoProfesseur = "assets/prof/" + matiere.photoProfesseur;
    this.image = "assets/matiere/" + matiere.image;
  }
  matieres?: Matiere[];
  matiere?: Matiere;
  nomMatiere: any;
  image: any;
  professeur: any;
  photoProfesseur: any;
  id:any;

  getMatieres() {
    this.matiereService.getMatieres().subscribe(matieres => {
      this.matieres = matieres;
    });
  }
}
