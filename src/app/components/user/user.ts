import { Component, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingData } from '../../services/sharing-data';

@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.html',
})
export class UserComponent {

  users: User[] = [];

  constructor(
    private sharingData: SharingData,
    private router: Router,
    private service: UserService
  ) {

    if (this.router.getCurrentNavigation()?.extras?.state?.['users']) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this.service.findAll().subscribe(users => this.users = users);
    }
  }

  onRemoveUser(id: number): void {
    Swal.fire({
      title: "Eliminar Usuario",
      text: "¿Estas seguro de que quieres eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.sharingData.idUserEvent.emit(id);
        Swal.fire("Borrado", "Usuario eliminado correctamente", "success");
      }
    });

  }

  onUpdateUser(user: User): void {
    console.log('Usuario seleccionado para editar:', user);
    this.sharingData.selectUserEvent.emit(user);
    this.router.navigate(['/user/edit', user.id],{state:{user}});
  }
}