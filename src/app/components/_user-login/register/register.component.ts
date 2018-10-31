import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  error: boolean = false;
  errorMessage: string = "InitialValue..";

  constructor(private authServ: AuthService,
        private formBuilder: FormBuilder,
        private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get f() {return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.registerForm.invalid){
      return;
    }
    this.tryRegister();
  }

  tryRegister(){
    let value: any = {email: this.f.email.value, password: this.f.password.value}

    this.authServ.doRegister(value).then(res => {
      console.log('Registration sucessfull :-)')
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = err.message;
      this.error = true;
    })
  }

}
