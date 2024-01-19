import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AssignmentsService} from "../services/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {SidenavService} from "../services/sidenav.service";
import {DataService} from "../services/data-sharing.service";
import {AssignmentLoggingComponent} from "../../assignement/assignment-logging/assignment-logging.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
   identifiant='test';

  constructor(private router: Router, private authService: AuthService, private sidenavService: SidenavService, private dataService: DataService) {
  }
  ngOnInit(): void {
    this.dataService.currentIdentifiant.subscribe(identifiant => {
      this.identifiant = identifiant;
    });
  }

  reloadApp() {
    this.authService.reset();
    this.router.navigate(['/logging'])
  }
  @Output() toggleSidenav = new EventEmitter<void>();

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }


  get isAdmin() {
    console.log(this.authService.Admin)
    return this.authService.Admin;
  }
  get isLogged() {
    console.log(this.authService.Admin)
    return this.authService.loggedIn;
  }

}
