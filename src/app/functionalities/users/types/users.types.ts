export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: number,
            lng: number;
        }
    },
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string
    }
}

export enum ESortingTypes {
    ASC = 'asc',
    DESC = 'desc'
}

export type SortingFields = 'name' | 'email';
