import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'bl18-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})


export class UserListComponent implements OnInit {

  errorMessage: string = "StartValue..";
  error: boolean = false;

  //users: any[];
  users: Array<any> = [];

  constructor(private dataServ: DataService) { }


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users = this.dataServ.getUsers();
    console.log(this.users);
  }
  
  SingleUser(index: number){
    console.log(this.users[index].name);
    return this.users[index];
  }

}

