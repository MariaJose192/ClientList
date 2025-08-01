import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingData {

  private _newUser: EventEmitter<User> = new EventEmitter();

  private _idUserEvent = new EventEmitter();

  private _selectUserEvent = new EventEmitter();

  private _findUserByIdEvent = new EventEmitter();

  private _selectUser = new EventEmitter();

  constructor() { }

  get newUser(): EventEmitter<User> {
    return this._newUser;
  }

  get idUserEvent(): EventEmitter<number> {
    return this._idUserEvent;
  }

  get selectUserEvent(): EventEmitter<User> {
    return this._selectUserEvent;
  }

  get findUserByIdEvent(): EventEmitter<number> {
    return this._findUserByIdEvent;
  }

  get selectUser(): EventEmitter<User> {
    return this._selectUser;
  }
}
