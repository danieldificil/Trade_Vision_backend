import {Err, Ok, Result} from "ts-results";
import {
    ILoginUseCase,
    LoginUseCaseErrors,
    LoginForm,
    LoginResult
} from "@/EnterpriseBusiness/useCases/auth/LoginUseCases";
import validators from "@/AplicationBusiness/validators/Validators";
import ValidateForm from "@/AplicationBusiness/decorators/ValidateForm";
import IUserRepository from "../../repository/IUserRepository";
import IHashService from "../../services/IHashService";
import NotFoundError from "../../../EnterpriseBusiness/errors/NotFoundError";
import LoginInvalidError from "../../../EnterpriseBusiness/errors/LoginInvalidError";
import ITokenService from "../../services/ITokenService";

export class LoginUseCase implements ILoginUseCase {

    constructor(
        readonly userRepository: IUserRepository,
        readonly hashService: IHashService,
        readonly tokenService: ITokenService) {
    }

    @ValidateForm({
        email: validators.email(),
        password: validators.password(),
    })
    async execute(form: LoginForm): Promise<Result<LoginResult, LoginUseCaseErrors>> {

        const {email, password} = form

        const getLoggedCustomerResult  = await this.userRepository.findByEmail(email);
        if (getLoggedCustomerResult.err) {
            if(getLoggedCustomerResult.val instanceof NotFoundError) return Err(new LoginInvalidError());
            return getLoggedCustomerResult;
        }
        const user = getLoggedCustomerResult.val;

        if(!this.hashService.compareUserPassword(password, user.password)) return Err(new LoginInvalidError());

        const token = this.tokenService.generateLoginToken(user);

        const loginUserModel: LoginResult = {
            ...user,
            token
        }

        return Ok(loginUserModel);
    }
}
