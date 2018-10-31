import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';

import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/_user-login/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserSingleComponent } from './components/user-single/user-single.component';
import { UserListSingleComponent } from './components/user-list-single/user-list-single.component';
import { UserOwnComponent } from './components/user-own/user-own.component';
import { RegisterComponent } from './components/_user-login/register/register.component';

import { environment } from './../environments/environment';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { ResetPasswordComponent } from './components/_user-login/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/_user-login/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    UserListComponent,
    UserSingleComponent,
    UserListSingleComponent,
    UserOwnComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    UserService,
    AuthService
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent],
})
export class AppModule { }
