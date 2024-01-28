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
  @Output() eleveId = new EventEmitter<string>();

  formGroup?: FormGroup;
  eleves?: Eleve[];
  matiere?: Matiere;
  id: any;
  nomEtudiant: string | undefined;
  numeroEtudiant: any;

  constructor(private formBuilder: FormBuilder, private eleveService: EleveService) {
    this.initFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assignementTransmis'] && this.assignementTransmis) {
      this.formGroup?.patchValue({ nomEleveSelect: this.assignementTransmis.eleve?.nom });
      this.nomEtudiant = this.assignementTransmis.eleve?.nom;
      this.numeroEtudiant = this.assignementTransmis.eleve?.numero;
    }
  }

  ngOnInit(): void {
    this.getEleves();
    if (this.assignementTransmis?.eleve) {
      this.updateFormWithEleve(this.assignementTransmis.eleve);
    }
  }

  private initFormGroup(): void {
    this.formGroup = this.formBuilder.group({ nomEleveSelect: ['', Validators.required] });

    this.formGroup.get('nomEleveSelect')?.valueChanges.subscribe(selectedEleve => {
      const eleve = this.eleves?.find(e => e.nom === selectedEleve);
      if (eleve) this.updateFormWithEleve(eleve);
    });
  }

  private updateFormWithEleve(eleve: Eleve): void {
    this.nomEtudiant = eleve.nom;
    this.numeroEtudiant = eleve.numero;
    this.onEleveSelected(eleve._id);
  }

  private getEleves(): void {
    this.eleveService.getEleves().subscribe(eleves => this.eleves = eleves);
  }

  onEleveSelected(id: string | undefined): void {
    this.eleveId.emit(id);
  }
}
