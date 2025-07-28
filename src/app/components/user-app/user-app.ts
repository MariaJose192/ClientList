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
  imports: [RouterOutlet, Navbar],
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
    this.findUserById();
  }

  findUserById() {
    this.sharingData.findUserByIdEvent.subscribe(id => {
      const user = this.users.find(u => u.id === id);
      this.sharingData.selectUser.emit(user);
    })
  }

  addUser() {
    this.sharingData.newUser.subscribe(user => {
      if (user.id > 0) {
        this.service.update(user).subscribe(userUpdate => {
          this.users = this.users.map(u => (u.id === userUpdate.id) ? { ...userUpdate } : u);
          this.router.navigate(['/users'], { state: { users: this.users } });

        })
      } else {
        this.service.create(user).subscribe(userCreated => {
          this.users = [...this.users, { ...userCreated }];
          this.router.navigate(['/users'], { state: { users: this.users } });

        });
      }
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
      this.service.remove(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
        this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
          this.router.navigate(['/users'], { state: { users: this.users } });
        });
      })
    });
  }

  setSelectUser(): void {
    this.sharingData.selectUserEvent.subscribe(user => {
      this.userSelected = { ...user };
    });
  }

}