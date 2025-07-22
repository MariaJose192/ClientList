import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.html',
})
export class UserComponent {

  @Input() users: User[] = [];

  @Output() idUserEvent = new EventEmitter();

  @Output() selectUserEvent = new EventEmitter();

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
        this.idUserEvent.emit(id);
        Swal.fire("Borrado", "Usuario eliminado correctamente", "success");
      }
    });

  }

  onUpdateUser(user: User): void {
    console.log('Usuario seleccionado para editar:', user);
    this.selectUserEvent.emit(user);
  }
}