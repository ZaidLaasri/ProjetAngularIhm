import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private identifiantSource = new BehaviorSubject<string>('');

  currentIdentifiant = this.identifiantSource.asObservable();

  changeIdentifiant(identifiant: string) {
    this.identifiantSource.next(identifiant);
  }
}
