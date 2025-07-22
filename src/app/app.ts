import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserApp } from "./components/user-app/user-app";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserApp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Listado de Usuarios';
}
