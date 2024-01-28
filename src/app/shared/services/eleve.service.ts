import { Injectable } from '@angular/core';
import {LoggingService} from "./logging.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Matiere} from "../models/matiere.model";
import {Eleve} from "../models/eleve.model";

@Injectable({
  providedIn: 'root'
})
export class EleveService {
  constructor(private loggingService: LoggingService, private http: HttpClient) {
  }
//  url = "http://localhost:8010/api/eleve";

url = "https://assignmentservice.onrender.com/api/eleve"

  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.url);
  }
}
