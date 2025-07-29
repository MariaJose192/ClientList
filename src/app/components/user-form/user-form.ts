import { Component, Output, EventEmitter, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingData } from '../../services/sharing-data';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit {

  user: User = new User();

  users: User[] = [];

  defaultImage: string = 'img/IconUser.png';
  preview: string | ArrayBuffer | null = this.defaultImage;
  selectedFile: File | null = null;

  isViewMode: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharingData: SharingData,
    private service: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  //Iniciamos el componente
  ngOnInit(): void {
    this.sharingData.selectUser.subscribe(user => this.user = user);

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.cargarUsuario(id);
      } else {
        this.preview = this.defaultImage;
      }
      if (this.route.snapshot.routeConfig?.path?.startsWith('users/view')) {
        this.isViewMode = true;
      }

      if (id > 0) {
        this.cargarUsuario(id);
      }
    });
  }

  //Método para cargar un usuario por ID
  cargarUsuario(id: number): void {
    this.service.findById(id).subscribe(user => {
      this.user = user;
      this.preview = user.image || this.defaultImage;
      this.cdr.detectChanges();
    });
  }

  //Método para cerrar la vista y volver al listado de usuarios
  cerrarVista(): void {
    this.service.findAll().subscribe(users => {
      this.service.setUsers(users);
      this.router.navigate(['/users']);
    });
  }

  //Método para manejar la selección de archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => this.preview = reader.result;
      reader.readAsDataURL(this.selectedFile);

      reader.onloadend = () => {
        this.user.image = reader.result as string;
      };
    }
  }

  //Método para enviar el formulario
  onSubmit(UserForm: NgForm): void {
    if (UserForm.valid) {
      console.log('Usuario registrado', this.user);
      this.sharingData.newUser.emit(this.user);
    }
    UserForm.resetForm();
    this.preview = null;
    this.selectedFile = null;
  }

  //Método para limpiar el formulario
  clearForm(UserForm: NgForm): void {
    UserForm.reset();
    this.preview = null;
    this.selectedFile = null;
  }
}
