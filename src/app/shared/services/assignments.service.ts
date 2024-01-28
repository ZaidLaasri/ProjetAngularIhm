import {Injectable} from '@angular/core';
import {Assignment} from "../models/assignement.model";
import {catchError, map, Observable, of} from "rxjs";
import {LoggingService} from "./logging.service";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

 // url = "http://localhost:8010/api/assignments";
  url = "https://assignmentservice.onrender.com/api/assignments"

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
  }

  getAssignments2(start: number = 0, limit: number = 20, rendu: boolean = false, search: string = ''): Observable<Assignment[]> {
    let params = new HttpParams()
        .set('start', start.toString())
        .set('limit', limit.toString())
        .set('rendu', rendu.toString())
        .set('search', search);

    return this.http.get<Assignment[]>(this.url, { params });
  }


  constructor(private loggingService: LoggingService, private http: HttpClient) {
  }

  addAssignments(assignment: Assignment): Observable<any> {
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



  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.url + '/' + id).pipe(map(a => {
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
