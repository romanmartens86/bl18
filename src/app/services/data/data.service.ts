import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  //private allUsers$: AngularFireList<any[]>;
  private allUsersUnsorted: any;

  public allUsersArr: Array<any> = [];

  constructor(public db: AngularFireDatabase) {
    this.downloadUsers();
  }


  downloadUsers() {
    this.db.list('/u_intern').query.once("value").then(res => {
      this.allUsersUnsorted = res.val();

      for (let key of Object.keys(this.allUsersUnsorted)) {
        let User = this.allUsersUnsorted[key];

        // to not lose the ID
        User.ID = key;

        // add user to array of users
        this.allUsersArr.push(User);
      }
    }, err => {
      console.log("Error on downloading UserList" + err.message);
    })
  }

  getUsers() {
    return this.allUsersArr;
  }

  getUser(ID: string) {
    this.db.object('/u_admin/' + ID).query.once("value").then(res => {
      this.allUsersArr.find(x => x.ID == ID).u_admin = res.val();
    }, err => {
      console.log("Error on downloading User" + err.message);
    })
  }

}
