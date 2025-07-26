import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingData } from '../../services/sharing-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-form',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit {

  user: User = new User();

  // NUEVAS PROPIEDADES
  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingData
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.sharingData.selectUser.subscribe(user => this.user = user);
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.sharingData.findUserByIdEvent.emit(id);
      }
    });
  }

  // NUEVO MÉTODO PARA SELECCIONAR IMAGEN
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => this.preview = reader.result;
      reader.readAsDataURL(this.selectedFile);

      // Guardamos la imagen (base64) en el objeto User
      reader.onloadend = () => {
        this.user.image = reader.result as string;  // Guardamos el base64 en user.image
      };
    }
  }

  onSubmit(UserForm: NgForm): void {
    if (UserForm.valid) {
      console.log('Usuario registrado', this.user);
      this.sharingData.newUser.emit(this.user);
    }
    UserForm.resetForm();
    this.preview = null;
    this.selectedFile = null;
  }

  clearForm(UserForm: NgForm): void {
    UserForm.reset();
    this.preview = null;
    this.selectedFile = null;
  }
}
