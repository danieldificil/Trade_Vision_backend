import UserAlreadyInSystem from "@/EnterpriseBusiness/errors/UserAlreadyInSystem";
import UseCase from "../useCase";
import DatabaseError from "../../errors/DatabaseError";

export interface CustomerUserRegisterForm {
    firstName: string
    lastName: string
    email: string
    password: string,
}

export type CustomerUserRegisterResult = undefined

export type CustomerUserRegisterUseCaseErrors = DatabaseError | UserAlreadyInSystem;

export type ICustomerUserRegisterUseCase = UseCase<CustomerUserRegisterForm, CustomerUserRegisterResult, CustomerUserRegisterUseCaseErrors>;
