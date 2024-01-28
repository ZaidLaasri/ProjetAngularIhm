import {Injectable} from '@angular/core';
import {resolve} from "@angular/compiler-cli";
import {user} from "../models/users.model";
import {AssignmentLoggingComponent} from "../../assignement/assignment-logging/assignment-logging.component";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 // url = "http://localhost:8010/api/users";

  url="https://assignmentservice.onrender.com/api/users"


  logIn(login: string, password: string): boolean {
    this.loggedIn = true;
    return true;
  }

  Admin = false

  login(nomUtilisateur: string, password: string): Observable<any> {
    return this.http.post<any>(this.url, { nomUtilisateur, password }).pipe(
      tap(response => {
        // Mettre à jour la variable admin avec la réponse
        this.loggedIn = true;
        this.Admin = response.admin;
      }),
      catchError(error => {
        // Gérer l'erreur
        return throwError(error);
      })
    );
  }



    reset(){
    this.Admin=false;
    this.loggedIn=false;
      this.router.navigate(['/logging'])

    }
  isAdmin(login: string, password: string): boolean {
   return this.Admin
  }

  loggedIn = false;


  logOut() {
    this.loggedIn = false;
  }

  //renvoie une promesse qui, lorsqu'elle est "resolved", renvoie si l'utilisateur
  //est admin ou pas. Pour le moment, renvoie true si il est loggé..
  isloggedIn() {
    const isUserLogged = new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn)
      }
    );
    return isUserLogged;
  }
  isAdminGuard() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        resolve( this.Admin)
      }
    );
    return isUserAdmin;
  }

  constructor(private router:Router, private http: HttpClient) {
  }
}
