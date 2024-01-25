import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Assignment} from "../../../shared/models/assignement.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Matiere} from "../../../shared/models/matiere.model";
import {EleveService} from "../../../shared/services/eleve.service";
import {Eleve} from "../../../shared/models/eleve.model";

@Component({
  selector: 'app-formulaire-eleve',
  templateUrl: './formulaire-eleve.component.html',
  styleUrls: ['./formulaire-eleve.component.css']
})
export class FormulaireEleveComponent implements OnInit {
  @Input() assignementTransmis?: Assignment;
  @Input() formGroup?: FormGroup;
  @Output() eleveId = new EventEmitter<string>();
  onEleveSelected(id: string | undefined) {
    this.eleveId.emit(id);
  }

  eleves?:Eleve[];

  constructor(private _formBuilder: FormBuilder, private eleveService: EleveService) {
    this.formGroup = this._formBuilder.group({
      nomEleveSelect: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getEleves();
    this.initFormGroup();
    if (this.assignementTransmis?.eleve) {
      this.updateFormWithEleve(this.assignementTransmis.eleve);
      this.onEleveSelected(this.assignementTransmis.eleve._id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assignementTransmis'] && this.assignementTransmis) {
      this.formGroup?.patchValue({
        nomEleveSelect: this.assignementTransmis.eleve?.nom,
      });
      this.nomEtudiant=this.assignementTransmis.eleve?.nom;
      this.numeroEtudiant=this.assignementTransmis.eleve?.numero;
    }
  }


  initFormGroup(): void {
    this.formGroup = this._formBuilder.group({
      nomEleveSelect: ['', Validators.required],
    });

    this.formGroup.get('nomEleveSelect')?.valueChanges.subscribe(selectedEleve => {
      const eleve = this.eleves?.find(e => e.nom === selectedEleve);
      if (eleve) {
        this.updateFormWithEleve(eleve);
      }
    });
  }
  updateFormWithEleve(eleve: Eleve): void {
    this.nomEtudiant=eleve.nom;
    this.numeroEtudiant=eleve.numero;
    this.onEleveSelected(eleve._id);
  }

  matiere?: Matiere;
  id:any;
  nomEtudiant:any;
  numeroEtudiant:any;

  getEleves() {
    this.eleveService.getEleves().subscribe(eleves => {
      this.eleves = eleves;
    });
  }

}
