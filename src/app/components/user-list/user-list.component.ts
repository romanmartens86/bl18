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

  users: any[];
  
  constructor(private dataServ: DataService) { }

  ngOnInit() {
  }




  
  tryGetUsers(){
    this.dataServ.getUsers().then(res => {
      this.users = res.val();

      // log whole object containing all users to console...
      console.log(this.users);

      for (let key of Object.keys(this.users)) {  
        let User = this.users[key];

        // will only log a single user to console...
        console.log(User);
      }


    }, err => {
      this.errorMessage = err.message;
      this.error = true
    })
  }

}

