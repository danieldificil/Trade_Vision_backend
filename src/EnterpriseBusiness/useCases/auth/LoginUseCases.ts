import FormError from "@/EnterpriseBusiness/errors/form/FormError";
import UseCase from "../useCase";
import DatabaseError from "../../errors/DatabaseError";
import LoginInvalidError from "../../errors/LoginInvalidError";

export enum UserType {
    Admin = 'Admin',
    Customer = 'Customer',
}

export type LoginForm = {
    email: string,
    password: string,
}

export type LoginResult = {
    firstName: string,
    lastName: string,
    type: UserType,
    email: string,
    password: string,
    token: string
}

export type LoginUseCaseErrors = DatabaseError | FormError | LoginInvalidError;

export type ICustomerLoginUseCase = UseCase<LoginForm, LoginResult, LoginUseCaseErrors, undefined>;
