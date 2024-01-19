import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  /*
  private sidenavToggleSubject = new BehaviorSubject<boolean>(false);

  toggle() {
    const newValue = !this.sidenavToggleSubject.value;
    console.log('Toggling sidenav:', newValue);
    this.sidenavToggleSubject.next(true);
  }


  get sidenavToggle$() {
    return this.sidenavToggleSubject.asObservable();
  }

   */
}
