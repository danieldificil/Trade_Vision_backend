import FormError from "@/EnterpriseBusiness/errors/form/FormError";
import {UserType} from "@/EnterpriseBusiness/entities/user.entity";
import UseCase from "../useCase";
import DatabaseError from "../../errors/DatabaseError";
import LoginInvalidError from "../../errors/LoginInvalidError";


export interface LoginUserForm {
    email: string
    password: string
}

export interface LoginUserResult {
    id: number,
    firstName: string
    lastName: string
    email: string
    token: string,
    type: UserType,
}

export type LoginUseCaseErrors = DatabaseError | FormError | LoginInvalidError;

export type ILoginUseCase = UseCase<LoginUserForm, LoginUserResult, LoginUseCaseErrors, undefined>;
