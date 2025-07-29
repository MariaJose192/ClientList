import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingData } from '../../services/sharing-data';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.html',
})
export class UserComponent implements OnInit {

  users: User[] = [];
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  constructor(
    private sharingData: SharingData,
    private router: Router,
    private service: UserService
  ) {

    if (this.router.getCurrentNavigation()?.extras?.state?.['/users']) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['/users'];
    } else {
      this.service.findAll().subscribe(users => this.users = users);
    }
  }

  //Iniciamos del componente
  ngOnInit() {
    this.service.users$.subscribe(users => {
      if (users.length === 0) {
        this.service.findAll().subscribe(users => this.users = users);
      } else {
        this.users = users;
      }
    });
    this.service.searchTerm$.subscribe(term => {
      const allUsers = this.service.search('');
      this.users = term ? this.service.search(term) : allUsers;
    });
  }

  // Método para buscar usuarios
  setSearchUser(term: string) {
    this.searchTermSubject.next(term);
  }

  //Método para navegar a la vista del usuario
  verUsuario(id: number): void {
    this.router.navigate(['/users/view', id]);
  }

  // Método para eliminar usuario donde se muestra un modal de confirmación
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

  // Método para crear usuario
  onCreateUser(): void {
    console.log('Navegando a crear usuario...');
    this.router.navigate(['users/create']);
  }


  // Método para navegar a la edición del usuario por ID
  onUpdateUser(user: User): void {
    console.log('Usuario seleccionado para editar:', user);
    this.sharingData.selectUserEvent.emit(user);
    this.router.navigate(['/user/edit', user.id], { state: { user } });
  }
}