import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class DataService {

  private internUsersArr: Array<bl18user> = [];
  private newUsersArr: Array<bl18user> = [];

  private adminDataUsersArray: Array<bl18userAdminData> = [];


  constructor(public db: AngularFireDatabase) {
    this.downloadInternUsers();
    this.downloadNewUsers();
  }

  downloadInternUsers() {
    this.db.list('/u_intern').query.once("value").then(res => {
      let internUsersUnsorted = res.val();

      // if Data has been downloaded - go through the downloaded users
      if (internUsersUnsorted) {
        for (let key of Object.keys(internUsersUnsorted)) {
          // get data Object into bl18user-class-format
          let UserClass: bl18user = {
            UID: internUsersUnsorted[key].UID,
            name: internUsersUnsorted[key].name,
            photoURL: internUsersUnsorted[key].photoURL
          }

          // add bl18user to array of bl18users
          this.internUsersArr.push(UserClass);
        }
      }
    }, err => {
      console.log("Error on downloading UserList" + err.message);
    })
  }

  downloadNewUsers() {
    this.db.list('/u_new').query.once("value").then(res => {
      let newUsersUnsorted = res.val();

      // if Data has been downloaded - go through the downloaded users
      if (newUsersUnsorted) {
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
      }
    }, err => {
      console.log("Error on downloading UserList" + err.message);
    })
  }


  downloadUserAdminData(ID: string): Promise<bl18userAdminData> {
    return new Promise<bl18userAdminData>((resolve, reject) => {
      this.db.object('/u_admin/' + ID).query.once("value").then(res => {
        let returnVal = res.val();
        let UserAdminData: bl18userAdminData = {
          UID: returnVal.UID,
          email: returnVal.email,
          level: returnVal.level,
          u_list: returnVal.u_list
        }
        this.adminDataUsersArray.push(UserAdminData);
        resolve(UserAdminData);

      }, err => {
        console.log("Error on downloading UserAdminData for User with id: " + ID + " errorMsg: " + err.message);
        reject(err);

      })
    })

  }


  getInternUsers(): Observable<bl18user[]> {
    return of(this.internUsersArr);
  }

  getNewUsers(): Observable<bl18user[]> {
    return of(this.newUsersArr);
  }

  getUserAdminData(): Observable<bl18userAdminData[]> {
    return of(this.adminDataUsersArray);
  }
}


export class bl18user {
  UID: string;
  name: string;
  photoURL: string
}

export class bl18userAdminData {
  UID: string;
  email: string;
  level: number;
  u_list: string
}
