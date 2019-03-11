import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  //private allUsers$: AngularFireList<any[]>;
  private internUsersUnsorted: any;
  //private newUsersUnsorted: any;

  public internUsersArr: Array<bl18user> = [];
  public newUsersArr: Array<bl18user> = [];

  public UserOwn: bl18user;


  constructor(public db: AngularFireDatabase) {
    this.downloadInternUsers();
    this.downloadNewUsers();
  }

  getUserOwn() {

    return this.UserOwn;
  }

  downloadInternUsers() {
    this.db.list('/u_intern').query.once("value").then(res => {
      this.internUsersUnsorted = res.val();

      //for (let key of Object.keys(this.internUsersUnsorted)) {
      //let User = this.internUsersUnsorted[key];

      // to not lose the ID
      //User.ID = key;

      // add user to array of users
      //this.internUsersArr.push(User);
      //}
    }, err => {
      console.log("Error on downloading UserList" + err.message);
    })
  }

  getInternUsers() {
    return this.internUsersArr;
  }




  getUser(ID: string) {
    this.db.object('/u_admin/' + ID).query.once("value").then(res => {
      this.internUsersArr.push = res.val();
    }, err => {
      console.log("Error on downloading User" + err.message);
    })
  }


  downloadNewUsers() {
    this.db.list('/u_new').query.once("value").then(res => {
      let newUsersUnsorted = res.val();

      for (let key of Object.keys(newUsersUnsorted)) {

        // get data Object into bl18user-class-format
        let UserClass: bl18user = {
          UID: newUsersUnsorted[key].UID,
          name: newUsersUnsorted[key].name,
          photoURL: newUsersUnsorted[key].photoURL
        }

        // add bl18user to array of bl18users
        this.newUsersArr.push(UserClass);
      }

    }, err => {
      console.log("Error on downloading UserList" + err.message);
    })
  }


  getNewUsers(): Observable<bl18user[]> {
    return of(this.newUsersArr);
  }

}


export class bl18user {
  UID: string;
  name: string;
  photoURL: string
}
