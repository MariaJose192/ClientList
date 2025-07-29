import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/api/users';

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  constructor(private http: HttpClient) { }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}`).pipe(
      tap(users => this.usersSubject.next(users))
    );
  }

  setUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}`, user).pipe(
      tap(userCreated => {
        const currentUsers = this.usersSubject.getValue();
        this.usersSubject.next([...currentUsers, userCreated]);
      })
    );
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user).pipe(
      tap(updatedUser => {
        const currentUsers = this.usersSubject.getValue();
        const newList = currentUsers.map(u =>
          u.id === updatedUser.id ? updatedUser : u
        );
        this.usersSubject.next(newList);
      })
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.getValue();
        const updatedUsers = currentUsers.filter(user => user.id !== id);
        this.usersSubject.next(updatedUsers);
      })
    );
  }

  setSearchUser(term: string): void {
    this.searchTermSubject.next(term);
  }

  search(term: string): User[] {
    const users = this.usersSubject.getValue();
    if (!term.trim()) return users;

    term = term.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.lastname.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term)
    );
  }
}
