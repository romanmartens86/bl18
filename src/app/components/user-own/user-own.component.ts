import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material'

import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'bl18-user-own',
  templateUrl: './user-own.component.html',
  styleUrls: ['./user-own.component.scss']
})
export class UserOwnComponent implements OnInit {

    // for error handling of login process
    errorMessage: string = "StartValue..";
    error: boolean = false;

  constructor(private authServ: AuthService,
              private dataServ: DataService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  doLogout() {
    this.authServ.doLogout().then(res => {
      this.router.navigate(['/home']);
      this.snackBar.open('Logout erfolgreich!', '', {duration:2000,})
    }, err => {
      this.errorMessage = err.message;
      this.error = true;
    })
  }


  tryGetUsers(){
    this.dataServ.getUsers();
  }



}
