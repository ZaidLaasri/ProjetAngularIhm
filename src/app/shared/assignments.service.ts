import {Injectable} from '@angular/core';
import {Assignment} from "../assignement/assignement.model";
import {catchError, map, Observable, of} from "rxjs";
import {LoggingService} from "./logging.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  url = "http://localhost:8010/api/assignments";
  assignements: Assignment[] = [{
    id: 1,
    nom: "TP sgbd",
    dateRendu: new Date(2023, 2, 5),
    rendu: true,
    note: 3
  },
    {
      id: 2,
      nom: "TP Angular",
      dateRendu: new Date(2023, 3, 5),
      rendu: true,
      note: 9
    },
    {
      id: 3,
      nom: "TP IOT",
      dateRendu: new Date(2023, 4, 5),
      rendu: false,
      note: 11
    },
  ]

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
  }

  constructor(private loggingService: LoggingService, private http: HttpClient) {
  }

  addAssignments(assignment: Assignment): Observable<any> {
    this.assignements.push(assignment)
    this.loggingService.log(assignment.nom, "ajouté")
    return this.http.post(this.url, assignment);
  }

  deleteAssignments(assignment: Assignment): Observable<Assignment> {
    /*  const index = this.assignements.indexOf(assignment);
      if (index !== -1) {
        this.assignements.splice(index, 1);
      }*/
    this.loggingService.log(assignment.nom, "supprimé")
    return this.http.delete<Assignment>(this.url + '/' + assignment._id)
  }

  assignmentsRendu(assignment: Assignment): Observable<string> {
    assignment.rendu = true;
    return of('assignement rendu')

  }

  updateAssignments(assignment: Assignment): Observable<Assignment> {
    return this.http.put(this.url, assignment);
  }

  getAssignment2(id: number): Observable<Assignment | undefined> {
    const a: Assignment | undefined = this.assignements.find(a => a.id === id)
    return of(a)
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.url + '/' + id).pipe(map(a => {
        a.nom += "reçu et transformé avec un pipe .."
        return a
      }),
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    )
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation + ' a échoué ' + error.message)
      return of(result as T)
    }
  }
}
