import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  log(assignmentName: any, action: any){
    console.log("Assignment : "+assignmentName+" "+action);
  }
  constructor() { }
}
