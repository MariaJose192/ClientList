import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  termino: string = '';

  constructor(private userService: UserService) {}

  // Método para buscar usuarios
  buscar() {
    this.userService.setSearchUser(this.termino);
  }
}
