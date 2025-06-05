import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ESortingTypes, IUser, SortingFields } from '../types/users.types';
import { UserCard } from '../components/user-card/user-card';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faRefresh, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-users-page',
    imports: [
        UserCard,
        FontAwesomeModule,
        ReactiveFormsModule
    ],
    templateUrl: './users-page.html',
    styleUrl: './users-page.scss',
    providers: [UsersService],
})
export class UsersPage implements OnInit {
    protected readonly filteredList = signal<IUser[]>([]);
    protected readonly userList = signal<IUser[]>([]);
    protected sortBy: SortingFields | null = null;
    protected sortDirection: ESortingTypes = ESortingTypes.ASC;
    protected filterTextControl: FormControl = new FormControl('');
    private readonly _userService = inject(UsersService);
    private readonly _library = inject(FaIconLibrary);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        this._library.addIcons(faSortUp, faSortDown, faRefresh, faCircleNotch);
    }

    ngOnInit() {
        this._userService.getUsersList().subscribe(users => {
            this.userList.set(users);
            this.filteredList.set(users);
        });

        this.filterTextControl.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntilDestroyed(this._destroyRef)
            ).subscribe(searchTerm => this.filterUsers(searchTerm || ''));
    }

    protected sortUsers(sortingField: SortingFields) {
        if (this.sortBy === sortingField) {
            this.sortDirection = this.sortDirection === ESortingTypes.ASC ? ESortingTypes.DESC : ESortingTypes.ASC;
        } else {
            this.sortBy = sortingField;
            this.sortDirection = ESortingTypes.ASC;
        }

        this.filteredList.update(currentUsers => {
            return currentUsers.sort((a, b) => {
                const valueA = a[sortingField].toLowerCase();
                const valueB = b[sortingField].toLowerCase();

                if (valueA < valueB) {
                    return this.sortDirection === ESortingTypes.ASC ? -1 : 1;
                } else if (valueA > valueB) {
                    return this.sortDirection === ESortingTypes.DESC ? -1 : 1;
                } else {
                    return 0;
                }
            })
        })
    }

    protected resetSorting() {
        this.sortBy = null;
        this.filteredList.update(users => [...users.sort((a, b) => a.id > b.id ? 1 : -1)]);
    }

    private filterUsers(searchTerm: string): void {
        if (!searchTerm) {
            this.filteredList.set(this.userList());
            return;
        }

        this.filteredList.update(users => {
            return users.filter(user => user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm));
        });
    }
}
