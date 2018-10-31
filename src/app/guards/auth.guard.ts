import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRoute, RouterStateSnapshot, Router, ActivatedRouteSnapshot} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';

import { UserService } from '../services/user/user.service';



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        console.log("AuthGuard: Authentication OK - routing to requested page..");
        return resolve(true);
      }, err => {
        console.log("AuthGuard: Missing authentication - routing to login page");
        this.router.navigate(['/login'], {
          queryParams: {
            return: state.url
          }
        });
        return resolve(false);
      })
    })
  }
}