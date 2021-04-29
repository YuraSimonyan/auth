import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';

import {UserState} from '../../shared/store/user.state';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loadingSpinner: boolean;

  @Select(UserState.isAuthorized)
  isAuthorized$: Observable<boolean>;

  constructor(private userServices: UserService, private route: Router) {
  }

  ngOnInit(): void {
    this.userServices.loadingSpinner.subscribe(value => this.loadingSpinner = value);
  }

  onLogOut(): void {
    this.userServices.logOut();
    this.route.navigate(['/auth']);
  }
}
