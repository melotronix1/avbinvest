import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersPage } from './functionalities/users/page/users-page';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, UsersPage],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected title = 'AVBINVEST Test App';
}
