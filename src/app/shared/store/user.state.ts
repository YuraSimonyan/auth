import {Injectable} from '@angular/core';
import {
  State,
  Action,
  StateContext,
  Selector
} from '@ngxs/store';

import {UserAction} from './user.action';

export class UserStateModel {
  isAuth: boolean;
}

@State<UserStateModel>({
  name: 'UserData',
  defaults: {
    isAuth: false
  }
})
@Injectable()
export class UserState {
  @Selector()
  static isAuthorized(state: UserStateModel): boolean {
    return state.isAuth;
  }

  @Action(UserAction)
  UserAction({patchState}: StateContext<UserStateModel>, {payload}: UserAction): void {
    patchState({isAuth: payload});
  }
}
