import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {DataService} from "../../shared/services/data-sharing.service";

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
  login() {
    this.authService.login(this.identifiant, this.password).subscribe(
      connection => {
        console.log(connection);
        // Stocker l'état de la session dans le LocalStorage ou SessionStorage
        localStorage.setItem('userSession', JSON.stringify(connection));
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        const errorMessage = error.error.error || 'Erreur inconnue';
        alert('Erreur lors de la connexion : ' + errorMessage);
      }
    );
  }

}
