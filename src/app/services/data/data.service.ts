import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import 'rxjs/operators';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public allUsers$: AngularFireList<Text>;


  db: AngularFireDatabase
  constructor() {  }

  getUsers() {
    //return this.db.list('/u_intern/').take(1)
    //return this.db.list('/u_intern/');
    //var testVar = this.db.object('/u_intern/').take(1);
    var testVar = this.db.object('/u_intern/')
    console.log(testVar);
  }
  

  
}
