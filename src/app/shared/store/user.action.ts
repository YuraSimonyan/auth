export class UserAction {
  static readonly type = '[user] Get Data';

  constructor(public payload: boolean) {
  }
}
