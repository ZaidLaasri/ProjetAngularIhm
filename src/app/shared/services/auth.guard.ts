import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        //return true;

        return this.authService.isloggedIn()
            .then(authentifie => {
                if (authentifie) {
                    console.log("navigation autorisée !")
                    return true;
                } else {
                    alert("Vous n'êtes pas connecté, Navigation non autorisé !")
                    console.log("navigation non permise !")

                    return false;
                }
            })
    }
}
