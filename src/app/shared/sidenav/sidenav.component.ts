import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from "../services/sidenav.service";
import {MatSidenav} from "@angular/material/sidenav";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit  {

  constructor(private router: Router) {
  }

  ngOnInit() {

  }
editToolbar(){
 alert("Veuillez séléctionner un devoir pour le modifier !")
}

deletToolbar(){
    alert("Veuillez séléctionner un devoir pour le modifier !")
  }

}
