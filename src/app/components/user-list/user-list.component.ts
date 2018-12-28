import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { forEach } from '@angular/router/src/utils/collection';

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
  unsortedUsers: any;

  testUsers = [
    {
      name: "roman"
    },
    {
      name: "Elvis"
    },
    {
      name: "Moon"
    },
    {
      name: "Moon"
    },
    {
      name: "Sun"
    }
  ]

  constructor(private dataServ: DataService) {  }

  ngOnInit() {  }


  tryGetUsers(){
    this.dataServ.getUsers().then(res => {
      this.unsortedUsers = res.val();

      // log whole object containing all users to console...
      console.log(this.unsortedUsers);

      for (let key of Object.keys(this.unsortedUsers)) {  
        let User = this.unsortedUsers[key];

        // to not lose the ID
        User.ID = key;

        // add user to array
        this.users.push(User);
      }

      console.log("now the array: ");
      console.log(this.users);

      this.users = this.users.slice();

    }, err => {
      this.errorMessage = err.message;
      this.error = true
    })
  }

}

