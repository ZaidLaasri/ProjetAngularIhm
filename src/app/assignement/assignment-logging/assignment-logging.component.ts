import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {DataService} from "../../shared/data-sharing.service";

@Component({
  selector: 'app-assignment-logging',
  templateUrl: './assignment-logging.component.html',
  styleUrls: ['./assignment-logging.component.css']
})
export class AssignmentLoggingComponent implements OnInit {

  identifiant: any;
  password: any;

  constructor(private authService: AuthService, private router: Router, private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  updateIdentifiant() {
    this.dataService.changeIdentifiant(this.identifiant);
  }
  admin: any;

  onLogin(): void {
    this.updateIdentifiant();
    this.authService.logIn(this.identifiant,this.password);
    this.authService.isAdmin(this.identifiant,this.password);
    this.router.navigate(['/home']);
  }

}
