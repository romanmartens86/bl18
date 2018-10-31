import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from '../components/home/home.component';
import { HeaderComponent } from '../components/header/header.component';
import { LoginComponent } from '../components/_user-login/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterComponent } from '../components/_user-login/register/register.component';
import { ResetPasswordComponent } from '../components/_user-login/reset-password/reset-password.component';
import { ForgotPasswordComponent } from '../components/_user-login/forgot-password/forgot-password.component';


const appRoutes: Routes = [
  // access without authentication:
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotPw', component: ForgotPasswordComponent},
  { path: 'resetPw', component: ResetPasswordComponent },

  // only authenticated users:
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  //{ path: 'profile', component: ProfileComponent},
]

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
