import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
})
export class UserForm {

  @Input() user: User = new User();

  @Input() open: boolean = false;

  @Output() newUser: EventEmitter<User> = new EventEmitter();

  @Output() openEvent = new EventEmitter();


  constructor() {
    this.user = new User();
  }

  onSubmit(UserForm: NgForm): void {
    if (UserForm.valid) {
      console.log('Usuario registrado', this.user);
      this.newUser.emit(this.user);
    }
    UserForm.resetForm();
    UserForm.reset();
  }
  clearForm(UserForm: NgForm): void {
    UserForm.reset();
  }

  onOpen() {
    console.log('Formulario abierto');
    this.openEvent.emit();
  }

}
