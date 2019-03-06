import { Component, OnInit } from '@angular/core';
import { DataService, bl18user } from 'src/app/services/data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bl18-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})


export class UserListComponent implements OnInit {

  errorMessage: string = "StartValue..";
  error: boolean = false;

  //users: any[];
  users: Array<bl18user> = [];
  newUsers: Observable<bl18user[]>;

  constructor(private dataServ: DataService) { }


  ngOnInit() {
    this.getUsers();
    this.getNewUsers();
  }

  getUsers() {
    this.users = this.dataServ.getInternUsers();
  }

  getNewUsers() {
    this.newUsers = this.dataServ.getNewUsers();
  }

  GetSingleUser(index: number) {
    //if (typeof this.users[index].u_admin === 'undefined') {
    //  this.dataServ.getUser(this.users[index].ID);
    //  this.getUsers();
    //}
  }
}

