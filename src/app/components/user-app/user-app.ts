import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user';
import { UserForm } from '../user-form/user-form';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { SharingData } from '../../services/sharing-data';


@Component({
  selector: 'user-app',
  imports: [UserComponent, UserForm, RouterOutlet, Navbar],
  templateUrl: './user-app.html',
  styleUrl: './user-app.css'
})
export class UserApp implements OnInit {

  users: User[] = [];

  userSelected: User;

  constructor(private service: UserService,
    private sharingData: SharingData,
    private router: Router
  ) {

    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.onRemoveUser();
    this.setSelectUser();
  }

  addUser() {
    this.sharingData.newUser.subscribe(user => {
      if (user.id > 0) {
        this.users = this.users.map(u => (u.id === user.id) ? { ...user } : u);
      } else {
        this.users = [... this.users, { ...user, id: this.users.length + 1 }];

      }
      this.router.navigate(['/users'], { state: { users: this.users } });
      Swal.fire({
        title: "Guardado",
        text: 'Usuario guardado correctamente',
        icon: "success",
      });
      this.userSelected = new User();
    });
  }

onRemoveUser(): void {
  this.sharingData.idUserEvent.subscribe(id => {
    this.users = this.users.filter(user => user.id !== id);
    this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users'], { state: { users: this.users } });
    });
  });
}

setSelectUser(): void {
  this.sharingData.selectUserEvent.subscribe(user => {
    this.userSelected = { ...user };
  });
}

}