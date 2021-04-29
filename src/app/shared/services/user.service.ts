import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {delay, share} from 'rxjs/operators';
import {Store} from '@ngxs/store';

import {UserAction} from '../store/user.action';
import {UserModel} from '../models/user.model';


@Injectable({providedIn: 'root'})
export class UserService {
  isLoginMode = new BehaviorSubject(true);
  loadingSpinner = new BehaviorSubject(false);

  constructor(private http: HttpClient, private store: Store) {
  }

  addUser(userData: UserModel): Observable<object> {
    this.loadingSpinner.next(true);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post('http://localhost:3000/users',
      JSON.stringify(userData),
      {headers}).pipe(delay(2000));
  }

  getUser(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('http://localhost:3000/users').pipe(share());
  }

  logOut(): void {
    this.store.dispatch(new UserAction(false));
  }

  resetForm(userForm: FormGroup): void {
    userForm.reset();
    Object.keys(userForm.controls).forEach(key => {
      userForm.get(key).setErrors(null);
    });
  }
}
