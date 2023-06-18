import {Err, Ok, Result} from "ts-results";
import {
    ICustomerLoginUseCase,
    CustomerLoginUseCaseErrors,
    CustomerLoginForm,
    CustomerLoginResult
} from "@/EnterpriseBusiness/useCases/auth/LoginUseCases";
import validators from "@/AplicationBusiness/validators/Validators";
import ValidateForm from "@/AplicationBusiness/decorators/ValidateForm";
import IUserRepository from "../../repository/IUserRepository";
import IHashService from "../../services/IHashService";
import NotFoundError from "../../../EnterpriseBusiness/errors/NotFoundError";
import LoginInvalidError from "../../../EnterpriseBusiness/errors/LoginInvalidError";
import ITokenService from "../../services/ITokenService";

export class CustomerLoginUseCase implements ICustomerLoginUseCase {

    constructor(
        readonly userRepository: IUserRepository,
        readonly hashService: IHashService,
        readonly tokenService: ITokenService) {
    }

    @ValidateForm({
        email: validators.email(),
        password: validators.password(),
    })
    async execute(form: CustomerLoginForm): Promise<Result<CustomerLoginResult, CustomerLoginUseCaseErrors>> {

        const getLoggedCustomer  = await this.userRepository.findByEmail(form.email);
        if (getLoggedCustomer.err) {
            if(getLoggedCustomer.val instanceof NotFoundError) return Err(new LoginInvalidError());
            return getLoggedCustomer;
        }
        const user = getLoggedCustomer.unwrap();

        if(!this.hashService.compareUserPassword(form.password, user.password)) return Err(new LoginInvalidError());

        const token = this.tokenService.generateLoginToken(user);

        const loginUserModel: CustomerLoginResult = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token,
            type: user.type,
        }

        return Ok(loginUserModel);
    }
}
