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
    this.authService.logIn(this.identifiant, this.password);
    this.authService.isAdmin(this.identifiant, this.password);
    this.router.navigate(['/home']);
  }

  login() {
    this.authService.login(this.identifiant, this.password).subscribe(
      connection => {
      console.log(connection)
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error); // Affiche l'objet d'erreur complet

        // Extraction du message d'erreur personnalisé
        const errorMessage = error.error.error || 'Erreur inconnue';
        alert('Erreur lors de la connexion : ' + errorMessage);
      }
    );
  }
}
