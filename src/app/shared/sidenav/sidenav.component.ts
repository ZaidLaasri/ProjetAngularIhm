import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from "../services/sidenav.service";
import {MatSidenav} from "@angular/material/sidenav";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit  {

  constructor() {
  }

  ngOnInit() {

  }


}
