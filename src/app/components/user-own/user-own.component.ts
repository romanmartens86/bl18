import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';

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
              private router: Router) { }

  ngOnInit() {
  }


  doLogout() {
    this.authServ.doLogout().then(res => {
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = err.message;
      this.error = true;
    })
  }

}
