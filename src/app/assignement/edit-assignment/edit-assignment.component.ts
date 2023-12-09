import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssignmentsService} from "../../shared/assignments.service";
import {Assignment} from "../assignement.model";
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

  onSaveAssignment() {
    if (!this.assignementTransmis) return;

    this.assignementTransmis.nom = this.nomDevoir;
    this.assignementTransmis.dateRendu = this.dateDevoir;
    this.assignmentsService.updateAssignments(this.assignementTransmis).subscribe(message => console.log(message))
    this.router.navigate(['/home'])
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(assignment => this.assignementTransmis = assignment);
    this.nomDevoir = this.assignementTransmis?.nom
  }
}
