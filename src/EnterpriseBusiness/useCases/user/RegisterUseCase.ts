import UserAlreadyInSystem from "@/EnterpriseBusiness/errors/UserAlreadyInSystem";
import UseCase from "../useCase";
import DatabaseError from "../../errors/DatabaseError";

export type RegisterForm = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export type RegisterUseCaseErrors = DatabaseError | UserAlreadyInSystem;

export type IRegisterUseCase = UseCase<RegisterForm, void, RegisterUseCaseErrors>;
