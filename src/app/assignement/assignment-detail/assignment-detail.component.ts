import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Assignment} from "../assignement.model";
import {AssignmentsService} from "../../shared/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {query} from "@angular/animations";
import {AuthService} from "../../shared/auth.service";
import {user} from "../../shared/users.model";

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignementTransmis?: Assignment;
  @Output() onDelete = new EventEmitter<Assignment>();
  @Output() detailVisibleChange = new EventEmitter<boolean>();
  @Input() detailVisible?: boolean;
  @Input() user?: user;

  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAssignment();
    console.log(this.assignementTransmis);
    console.log(this.detailVisible);

  }

  assignementRendu(): void {
    if (this.assignementTransmis) {
      this.assignementTransmis.rendu=true;
      this.assignmentsService.updateAssignments(this.assignementTransmis).subscribe(message => {
        console.log(message)
        this.router.navigate(['/home'])
      })

    }
  }

  onDeleteAssignment(): void {
    if (this.assignementTransmis) {
      this.detailVisible = false
      this.detailVisibleChange.emit(this.detailVisible);
      //  this.onDelete.emit(this.assignementTransmis);
      this.assignmentsService.deleteAssignments(this.assignementTransmis).subscribe(message => console.log(message))
    }
    this.router.navigate(['/home'])

  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(assignment => this.assignementTransmis = assignment);
  }

  onClickEdit() {
    this.router.navigate(['/assignement', this.assignementTransmis?.id, 'edit'], {
      queryParams: {nom: this.assignementTransmis?.nom},
      fragment: 'edition'
    })
  }

  isAdmin(): boolean {
    return this.authService.Admin;
    //return <boolean>this.user?.admin;
  }

  reloadApp() {
    this.authService.reset();
    this.router.navigate(['/logging'])
  }
  sidenavOpended=true;
  onToggleSidenav() {
    this.sidenavOpended=!this.sidenavOpended;
  }
  isLogged(): user {
    return <user>this.user
  }
}
