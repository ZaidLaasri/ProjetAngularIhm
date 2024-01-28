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
      nomDevoir: ['', Validators.required],
      dateDevoir: ['', Validators.required],
      noteDevoir: [''],
      renduDevoir: [{ value: false, disabled: true }]
    });
  }

  ngOnInit(): void {
    this.setupNoteDevoirSubscription();
    this.updateFormWithAssignment();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assignementTransmis']) {
      this.updateFormWithAssignment();
    }
  }

  private setupNoteDevoirSubscription(): void {
    this.formGroup?.get('noteDevoir')?.valueChanges.subscribe(value => {
      if (value) {
        this.formGroup?.get('renduDevoir')?.enable();
      } else {
        this.formGroup?.get('renduDevoir')?.disable();
      }
    });
  }

  private updateFormWithAssignment(): void {
    if (this.assignementTransmis) {
      this.formGroup?.patchValue({
        nomDevoir: this.assignementTransmis.nom,
        dateDevoir: this.assignementTransmis.dateRendu,
        noteDevoir: this.assignementTransmis.note,
        renduDevoir: this.assignementTransmis.rendu
      });

      if (this.assignementTransmis.note) {
        this.formGroup?.get('renduDevoir')?.enable();
      } else {
        this.formGroup?.get('renduDevoir')?.disable();
      }
    } else {
      this.formGroup?.reset({
        nomDevoir: '',
        dateDevoir: '',
        noteDevoir: '',
        renduDevoir: { value: false, disabled: true }
      });
    }
  }
}
