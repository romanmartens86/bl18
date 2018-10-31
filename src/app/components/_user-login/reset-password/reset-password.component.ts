import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  oobCode: string;
  resetPasswordForm: FormGroup;
  submitted = false;

  error: boolean = false;
  errorMessage: string = "InitialValue..";

  constructor( private authServ: AuthService,
            private formBuilder: FormBuilder,
            private router: Router,
            private actRoute: ActivatedRoute ) {  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.actRoute.queryParams.subscribe(params => {
      this.oobCode = params["oobCode"];
    })
  }

  get f() {return this.resetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.resetPasswordForm.invalid){
      return;
    }
    this.tryNewPassword();
  }

  tryNewPassword(){
    let password: any = this.f.password.value;

    this.authServ.doConfirmPasswordReset(this.oobCode, password).then(res => {
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = err.message;
      this.error = true;
    })
  }
}
