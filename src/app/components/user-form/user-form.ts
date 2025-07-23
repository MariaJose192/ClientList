import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingData } from '../../services/sharing-data';
import { Router } from '@angular/router';

@Component({
  selector: 'user-form',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './user-form.html',
})
export class UserForm {

  user: User = new User();



  constructor(
    private router: Router,
    private sharingData: SharingData) {
    if (this.router.getCurrentNavigation()?.extras?.state?.['user']) {
      this.user = this.router.getCurrentNavigation()?.extras.state!['user'];
    } else {
      this.user = new User();
    }
  }

  onSubmit(UserForm: NgForm): void {
    if (UserForm.valid) {
      console.log('Usuario registrado', this.user);
      this.sharingData.newUser.emit(this.user);
    }
    UserForm.resetForm();
    UserForm.reset();
  }
  clearForm(UserForm: NgForm): void {
    UserForm.reset();
  }

}
