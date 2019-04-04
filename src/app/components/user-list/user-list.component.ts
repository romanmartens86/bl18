import { Component, OnInit } from '@angular/core';
import { DataService, bl18user, bl18userAdminData } from 'src/app/services/data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bl18-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})


export class UserListComponent implements OnInit {

  // Variables for UI
  errorMessage: string = "StartValue..";
  error: boolean = false;

  selectedAdminUserData: bl18userAdminData;
  selectedAdminUserUID: string;


  // Lists of users and user data
  users: bl18user[];
  newUsers: bl18user[];

  adminUserData: bl18userAdminData[];

  constructor(private dataServ: DataService) { }


  ngOnInit() {
    this.getUsers();
    this.getNewUsers();
    this.getUserAdminData();
  }

  getUsers() {
    this.dataServ.getInternUsers()
      .subscribe(internUsers => this.users = internUsers)
  }

  getNewUsers(): void {
    this.dataServ.getNewUsers()
      .subscribe(newUsers => this.newUsers = newUsers)
  }

  getUserAdminData(): void {
    this.dataServ.getUserAdminData()
      .subscribe(adminData => {
        this.adminUserData = adminData;
        //this.selectedAdminUserData = this.adminUserData.find(o => o.UID === this.selectedAdminUserUID)
      })
  }

  GetSingleUser(uid: string) {
    this.selectedAdminUserUID = uid;
    this.selectedAdminUserData = null;

    if (!this.adminUserData) {
      this.dataServ.downloadUserAdminData(uid)
        .then(res => {
          this.selectedAdminUserData = res;
        }, err => {
          console.log(err);
        });
    } else {
      this.selectedAdminUserData = this.adminUserData.find(o => o.UID === uid)

      if (!this.selectedAdminUserData) {
        this.dataServ.downloadUserAdminData(uid)
          .then(res => {
            this.selectedAdminUserData = res;
          }, err => {
            console.log(err);
          });
      }
    }
  }
}