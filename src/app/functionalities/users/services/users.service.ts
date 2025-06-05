import { inject, Injectable } from '@angular/core';
import { UsersModel } from '../models/users.model';

@Injectable()
export class UsersService {
    private _usersModel = inject(UsersModel);

    public getUsersList() {
        return this._usersModel.getUsersList();
    }
}
