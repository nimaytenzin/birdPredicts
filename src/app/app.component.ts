import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import {Location} from '@angular/common';

 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit() {
     
  }

  
}
