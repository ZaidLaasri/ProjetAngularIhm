import {Injectable} from '@angular/core';
import {resolve} from "@angular/compiler-cli";
import {user} from "./users.model";
import {AssignmentLoggingComponent} from "../assignement/assignment-logging/assignment-logging.component";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url = "http://localhost:8010/api/users";

  user: user = {
    login: 'Zaid',
    password: '0000',
    admin: true
  }

  logIn(login: string, password: string): boolean {
    this.loggedIn = true;
    return true;
  }

  login(nomUtilisateur: string, password: string): Observable<any> {
    return this.http.post(this.url, { nomUtilisateur, password });
  }



    reset(){
    this.Admin=false;
    this.loggedIn=false;
      this.router.navigate(['/logging'])

    }
  isAdmin(login: string, password: string): boolean {
    if (login === this.user.login && password === this.user.password) {
      this.Admin = true;
      return true;
    } else {
      return false
    }
  }

  loggedIn = false;
  Admin = false


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
