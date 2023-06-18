import FormError from "@/EnterpriseBusiness/errors/form/FormError";
import User, {UserType} from "@/EnterpriseBusiness/entities/user.entity";
import UseCase from "../useCase";
import DatabaseError from "../../errors/DatabaseError";
import LoginInvalidError from "../../errors/LoginInvalidError";

type Token = {token: string}

export type CustomerLoginForm = Pick<
    User,
    'email' |
    'password'
    >

export type CustomerLoginResult = Omit<
    User,
    'password'
    > & Token

export type CustomerLoginUseCaseErrors = DatabaseError | FormError | LoginInvalidError;

export type ICustomerLoginUseCase = UseCase<CustomerLoginForm, CustomerLoginResult, CustomerLoginUseCaseErrors, undefined>;
