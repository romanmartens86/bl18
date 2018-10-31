import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  // Variables for setting up the forms to login with username and password
  registerForm: FormGroup;
  submitted = false;

  // for error handling of login process
  errorMessage: string = "StartValue..";
  error: boolean = false;


  // to find a page to redirect after Login
  redirectPage: string = '';


  // constructor and functions
  constructor(private authServ: AuthService,
            private formBuilder: FormBuilder,
            private router: Router,
            private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.actRoute.queryParams.subscribe(params => {
      this.redirectPage = params['return'];
      });
        
  }



  // just to get easy access to the register values,
  // we can just type f.values.email ...
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid:
    if (this.registerForm.invalid){
      return;
    }
    
    this.tryLogin();
  }


  tryGoogleLogin(){
    this.authServ.doGoogleLogin().then(res => {
      this.router.navigate([this.redirectPage]);
    }, err => {
      this.errorMessage = err.message;
      this.error = true;
    })
  }

  tryTwitterLogin(){
    this.authServ.doTwitterLogin().then(res => {
      this.router.navigate([this.redirectPage]);
    }, err => {
      this.errorMessage = err.message;
      this.error = true;
    })
  }

  tryFacebookLogin(){
    this.authServ.doFacebookLogin().then(res => {
      this.router.navigate([this.redirectPage]);
    }, err => {
      this.errorMessage = err.message;
      this.error = true;
    })
  }

  tryLogin() {
    let value: any = {email: this.f.email.value, password: this.f.password.value}

    this.authServ.doLogin(value).then(res => {
      this.router.navigate([this.redirectPage]);
    }, err => {
      this.errorMessage = err.message;
      this.error = true;
    })
  }

  changeToRegister() {
    this.router.navigate(['/register']);
  }
}
