import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./shared/auth.service";
import {user} from "./shared/users.model";
import {AssignmentLoggingComponent} from "./assignement/assignment-logging/assignment-logging.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Application de gestion de devoirs rendus (Assignments)';

    constructor(private router: Router, private authService: AuthService) {
    }

  ngOnInit() {

  }

}
