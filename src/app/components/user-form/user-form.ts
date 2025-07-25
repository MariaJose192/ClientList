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



  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingData) {
    this.user = new User();

  }
  ngOnInit(): void {
    this.sharingData.selectUser.subscribe(user  => this.user = user)
    this.route.paramMap.subscribe(params =>{
      const id: number = +(params.get('id') || '0'); 

      if(id > 0){
        this.sharingData.findUserByIdEvent.emit(id);
      }
    })
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
