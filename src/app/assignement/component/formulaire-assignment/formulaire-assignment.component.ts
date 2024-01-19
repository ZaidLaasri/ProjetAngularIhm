import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Assignment} from "../../../shared/models/assignement.model";

@Component({
  selector: 'app-formulaire-assignment',
  templateUrl: './formulaire-assignment.component.html',
  styleUrls: ['./formulaire-assignment.component.css']
})
export class FormulaireAssignmentComponent implements OnInit {

  @Input() assignementTransmis?: Assignment;
  @Input() formGroup?: FormGroup;
  renduDevoir: any;

  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      // initialiser avec des contrôles vides ou des valeurs par défaut
      nomDevoir: ['', Validators.required],
      dateDevoir: ['', Validators.required],
      noteDevoir: ['', Validators.required],
      renduDevoir: [false]
    });
  }

  ngOnInit(): void {
    if (this.assignementTransmis) {
      if (this.formGroup)
        this.formGroup.patchValue({
          nomDevoir: this.assignementTransmis.nom,
          dateDevoir: this.assignementTransmis.dateRendu,
          noteDevoir: this.assignementTransmis.note,
          renduDevoir: this.assignementTransmis.rendu
        });
    }
    this.renduDevoir = this.assignementTransmis?.rendu;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assignementTransmis'] && this.assignementTransmis) {
      this.updateForm();
    }
  }
  updateForm(): void {
    if (this.formGroup) {
      this.formGroup.patchValue({
        nomDevoir: this.assignementTransmis?.nom,
        dateDevoir: this.assignementTransmis?.dateRendu,
        noteDevoir: this.assignementTransmis?.note,
        renduDevoir: this.assignementTransmis?.rendu
      });
      this.renduDevoir = this.assignementTransmis?.rendu;
    }
  }
  updateFormgroup() {

  }


}
