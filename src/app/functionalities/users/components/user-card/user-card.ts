import { Component, input } from '@angular/core';
import { IUser } from '../../types/users.types';

@Component({
    selector: 'app-user-card',
    imports: [],
    templateUrl: './user-card.html',
    styleUrl: './user-card.scss'
})
export class UserCard {
    userInput = input.required<IUser>();
}
