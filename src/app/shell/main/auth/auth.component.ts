import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';

import {UserModel} from '../../../shared/models/user.model';
import {UserService} from '../../../shared/services/user.service';
import {UserState} from '../../../shared/store/user.state';
import {UserAction} from '../../../shared/store/user.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  userForm: FormGroup;
  isLoginMode: boolean;
  isLoading: boolean;

  @Select(UserState.isAuthorized)
  isAuthorized$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private route: Router,
    private router: ActivatedRoute,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(
        '',
        [
          Validators.email,
          Validators.required
        ],
        this.forbiddenEmails.bind(this)
      ),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ],
        this.forbiddenPasswords.bind(this)
      )
    });
    this.userService.isLoginMode.subscribe(value => this.isLoginMode = value);
    this.userService.loadingSpinner.subscribe(value => this.isLoading = value);
  }

  sendData(): void {
    const userEmail = this.userForm.get('email').value;
    const userPassword = this.userForm.get('password').value;

    if (this.userService.isLoginMode.value) {
      const userValue = new UserModel(userEmail, userPassword);
      this.userService.addUser(userValue).subscribe(value => {
        this.userService.isLoginMode.next(!this.userService.isLoginMode.value);
        this.userService.resetForm(this.userForm);
        this.userService.loadingSpinner.next(false);
      });
    }

    if (!this.userService.isLoginMode.value) {
      this.userService.getUser().subscribe((userData) => {
        if (userData.find(value => value.user === userEmail && value.password === userPassword)) {
          this.store.dispatch(new UserAction(true));
          this.userService.isLoginMode.next(!this.userService.isLoginMode.value);
          this.userService.resetForm(this.userForm);
          this.route.navigate([''], {relativeTo: this.router});
        }
      });
    }
  }

  onSwitchMode(): void {
    this.userService.isLoginMode.next(!this.userService.isLoginMode.value);
    this.userService.resetForm(this.userForm);
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve) => {
      this.userService.getUser().subscribe((value: UserModel[]) => {
        if (value.find((name) => control.value === name.user) && this.isLoginMode) {
          resolve({emailIsForbidden: true});
        }

        if (!this.isLoginMode && !value.find((item) => item.user === control.value)) {
          resolve({wrongEmail: true});
        } else {
          resolve(null);
        }
      });
    });
  }

  forbiddenPasswords(control: FormControl): Promise<any> | Observable<any> {
    const email = this.userForm.get('email').value;
    return new Promise<any>((resolve) => {
      this.userService.getUser().subscribe((value: UserModel[]) => {
        if (value.find((name) => email === name.user && control.value !== name.password) && !this.isLoginMode) {
          resolve({wrongPassword: true});
        } else {
          resolve(null);
        }
      });
    });
  }
}
