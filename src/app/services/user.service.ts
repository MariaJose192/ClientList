import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'Maria ',
      lastName: 'Alcaraz',
      email: 'marialcaraz@gmail.com',
      username: 'mari19',
      password : '123456'
    },
    {
      id: 2,
      name: 'Juanfra ',
      lastName: 'Ruiz',
      email: 'juanfra@gmail.com',
      username: 'juanfra1991',
      password : '123456'
    },
    {
      id: 3,
      name: 'Jesus ',
      lastName: 'Alcaraz',
      email: 'jesus@gmail.com',
      username: 'jesus1966',
      password : '123456'
    },
    {
      id: 4,
      name: 'Maria ',
      lastName: 'Sanchez',
      email: 'maria@gmail.com',
      username: 'maria1969',
      password : '123456'
    }
  ];
  
  constructor() {}

  findAll(): Observable<User[]>{
    return of(this.users);
  }
    
}
