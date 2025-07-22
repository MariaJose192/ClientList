import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user';
import { UserForm } from '../user-form/user-form';
import Swal from 'sweetalert2';


@Component({
  selector: 'user-app',
  imports: [UserComponent, UserForm],
  templateUrl: './user-app.html',
  styleUrl: './user-app.css'
})
export class UserApp implements OnInit {

  users: User[] = [];

  userSelected: User;

  open: boolean = false;

  constructor(private service: UserService) {

    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

  addUser(user: User) {
    if (user.id > 0) {
      this.users = this.users.map(u => (u.id === user.id) ? { ...user } : u);
    } else {
      this.users = [... this.users, { ...user, id: this.users.length + 1 }];
    }
    Swal.fire({
      title: "Guardado",
      text: 'Usuario guardado correctamente',
      icon: "success",
    });
    this.userSelected = new User();
    this.setOpen();
  }

  onRemoveUser(id: number): void {

    this.users = this.users.filter(user => user.id !== id);

  }


  setSelectUser(user: User): void {
    this.userSelected = { ...user };
    this.open = true;
  }

  setOpen() {
        console.log('Formulario abierto 2');
    this.open = !this.open;
  }
}
