import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, Params } from '@angular/router'

import { AuthService } from '../../../services/auth/auth.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  requestNewPasswordForm: FormGroup;
  submitted = false;
  
  error: boolean = false;
  errorMessage: string = "InitialValue..";

  constructor( private authServ: AuthService,
            private formBuilder: FormBuilder,
            private router: Router ) {  }

  ngOnInit() {
    this.requestNewPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get f() {return this.requestNewPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.requestNewPasswordForm.invalid){
      return;
    }
    this.tryResetPassword();
  }

  tryResetPassword(){
    let email: any = this.f.email.value;

    this.authServ.doResetPassword(email).then(res => {
      this.router.navigate(['/home']);
    }, err => {
      this.error = true;
      this.errorMessage = err.message;
    })
  }
}