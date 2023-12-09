import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent {
  assignements = [{
    nom: "TP sgbd",
    dateRendu: "02/020/2",
    rendu: true,
    note: 3
  },
    {
      nom: "TP Angular",
      dateRendu: "02/020/2",
      rendu: true,
      note: 9
    },
    {
      nom: "TP IOT",
      dateRendu: "02/020/2",
      rendu: false,
      note: 11
    },
  ]
}
