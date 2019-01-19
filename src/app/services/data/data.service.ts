import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import 'rxjs/operators';
import { UserOwnComponent } from 'src/app/components/user-own/user-own.component';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  //private allUsers$: AngularFireList<any[]>;
  private internUsersUnsorted: any;
  private newUsersUnsorted: any;

  public internUsersArr: Array<any> = [];
  public newUsersArr: Array<any> = [];

  public UserOwn: any;


  constructor(public db: AngularFireDatabase) {
    this.downloadInternUsers();
    this.downloadNewUsers();
    console.log("intern Users: " + this.internUsersUnsorted);
    console.log("new Users: " + this.newUsersUnsorted);
  }

  getUserOwn() {

    return this.UserOwn;
  }

  downloadInternUsers() {
    this.db.list('/u_intern').query.once("value").then(res => {
      this.internUsersUnsorted = res.val();

      for (let key of Object.keys(this.internUsersUnsorted)) {
        let User = this.internUsersUnsorted[key];

        // to not lose the ID
        User.ID = key;

        // add user to array of users
        this.internUsersArr.push(User);
      }
    }, err => {
      console.log("Error on downloading UserList" + err.message);
    })
  }

  getInternUsers() {
    return this.internUsersArr;
  }




  getUser(ID: string) {
    this.db.object('/u_admin/' + ID).query.once("value").then(res => {
      this.internUsersArr.find(x => x.ID == ID).u_admin = res.val();
    }, err => {
      console.log("Error on downloading User" + err.message);
    })
  }






  downloadNewUsers() {
    this.db.list('/u_new').query.once("value").then(res => {
      this.newUsersUnsorted = res.val();

      for (let key of Object.keys(this.newUsersUnsorted)) {
        let User = this.newUsersUnsorted[key];

        // to not lose the ID
        User.ID = key;

        // add user to array of users
        this.internUsersArr.push(User);
      }
    }, err => {
      console.log("Error on downloading UserList" + err.message);
    })
  }

  getNewUsers() {
    return this.newUsersArr;
  }

}
