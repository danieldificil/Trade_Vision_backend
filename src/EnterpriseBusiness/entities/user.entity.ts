
export enum UserType {
    Admin = 'Admin',
    Customer = 'Customer',
}

export default interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: UserType;
}
