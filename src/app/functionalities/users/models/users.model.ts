import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../types/users.types';
import { environment } from '../../../environments/environment';
import { catchError, delay } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersModel {
    private readonly _http = inject(HttpClient);

    public getUsersList() {
        // Добавлена искусственная задержка 2 секунды для демонстрации лоадера
        return this._http.get<IUser[]>(`${environment.JSON_PLACEHOLDER_API}/users`)
            .pipe(
                delay(2000),
                catchError(err => {
                    console.error('Возникла ошибка при получении списка пользователей!', err.message);
                    return [];
                })
            );
    }
}
