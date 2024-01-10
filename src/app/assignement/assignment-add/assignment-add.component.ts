import {Component, Output, EventEmitter} from '@angular/core';
import {Assignment} from "../../shared/models/assignement.model";
import {AssignmentsService} from "../../shared/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";


@Component({
  selector: 'app-assignment-add',
  templateUrl: './assignment-add.component.html',
  styleUrls: ['./assignment-add.component.css']
})
export class AssignmentAddComponent {
  // @Output() newAssignement = new EventEmitter<Assignment>();

  ajoutActive = false;

  dateDevoir: any;
  nomDevoir: any;
  renduDevoir: any;
  noteDevoir: any
  formVisible = false;

  colorActive = "green";


  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  reloadApp() {
    this.authService.reset();
    this.router.navigate(['/logging'])
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.ajoutActive = true;
      this.colorActive = "blue";

    }, 3000);
  }

  onSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault()
    console.log("on appuie");
    console.log(this.nomDevoir);
    const newAssignement = new Assignment();
    newAssignement.id = Math.floor(Math.random() * 1000);
    newAssignement.nom = this.nomDevoir;
    newAssignement.dateRendu = new Date(this.dateDevoir);
    newAssignement.note = parseInt(this.noteDevoir);
    newAssignement.rendu = this.renduDevoir
    // this.newAssignement.emit(newAssignement);
    console.log(newAssignement);

    this.assignmentsService.addAssignments(newAssignement).subscribe(message => {
      console.log(message)
      this.router.navigate(['/home']);
    })


  }
  sidenavOpended=true;
  onToggleSidenav() {
    this.sidenavOpended=!this.sidenavOpended;
  }

}
