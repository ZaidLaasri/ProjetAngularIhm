import {Component, Output, EventEmitter} from '@angular/core';
import {Assignment} from "../../shared/models/assignement.model";
import {AssignmentsService} from "../../shared/services/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'app-assignment-add',
    templateUrl: './assignment-add.component.html',
    styleUrls: ['./assignment-add.component.css']
})
export class AssignmentAddComponent {
    dateDevoir: any;
    nomDevoir: any;
    renduDevoir: any;
    noteDevoir: any
    parentFormGroup: FormGroup;


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
    }

    onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault()
        const newAssignement: any ={
            id: Math.floor(Math.random() * 9000) + 1001,
            nom: this.firstFormGroup.value.nomDevoir,
            dateRendu: new Date(this.firstFormGroup.value.dateDevoir),
            note: parseInt(this.firstFormGroup.value.noteDevoir),
            rendu: this.firstFormGroup.value.renduDevoir,
            matiere: this.selectedMatiereId,
            eleve: this.selectedEleveId,
        };
        console.log(newAssignement);
        this.assignmentsService.addAssignments(newAssignement).subscribe(message => {
            console.log(message)
            this.router.navigate(['/home']);
        })
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

    sidenavOpended = true;
    onToggleSidenav() {
        this.sidenavOpended = !this.sidenavOpended;
    }

}
