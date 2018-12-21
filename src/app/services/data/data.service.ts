import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import 'rxjs/operators';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public allUsers$: AngularFireList<any[]>;

  

  constructor(public db: AngularFireDatabase) {  }

  getUsers() {
    //return this.db.list('/u_intern/').take(1)
    //return this.db.list('/u_intern/');
    //var testVar = this.db.object('/u_intern/').take(1);
    //var testVar = this.db.object('/u_intern/')
    //console.log(testVar);
    //this.allUsers$ = this.db.list('/u_intern');
    //console.log(this.allUsers$.valueChanges()
    //return this.allUsers$.valueChanges();
    //this.allUsers$ = this.db.list('/u_intern').query.once("value");
    return this.db.list('/u_intern').query.once("value");
  }
  

  
}
