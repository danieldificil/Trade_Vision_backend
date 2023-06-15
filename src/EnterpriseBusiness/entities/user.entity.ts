
export enum UserType {
    Admin = 'Admin',
    Employee = 'Employee',
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
