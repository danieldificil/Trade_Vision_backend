import {Err, Ok, Result} from "ts-results";
import IUserRepository from "@/AplicationBusiness/repository/IUserRepository";
import DatabaseError from "@/EnterpriseBusiness/errors/DatabaseError";
import NotFoundError from "@/EnterpriseBusiness/errors/NotFoundError";
import UserAlreadyInSystem from "@/EnterpriseBusiness/errors/UserAlreadyInSystem";
import ValidateForm from "@/AplicationBusiness/decorators/ValidateForm";
import validators from "@/AplicationBusiness/validators/Validators";
import {
    CustomerUserRegisterForm, CustomerUserRegisterResult, CustomerUserRegisterUseCaseErrors,
    ICustomerUserRegisterUseCase
} from "@/EnterpriseBusiness/useCases/user/CustomerUserRegisterUseCase";
import IHashService from "../../services/IHashService";

export default class CustomerUserRegisterUseCase implements ICustomerUserRegisterUseCase {
    userRepository: IUserRepository;

    hashService: IHashService;

    constructor(userRepository: IUserRepository, hashService: IHashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }

    @ValidateForm({
        firstName: validators.string(),
        lastName: validators.string(),
        email: validators.email(),
        password: validators.password(),
    })
    async execute(form: CustomerUserRegisterForm): Promise<Result<CustomerUserRegisterResult, CustomerUserRegisterUseCaseErrors>> {
        const verifyIfEmailIsUsedResult = await this.verifyIfEmailIsUsed(form.email);
        if(verifyIfEmailIsUsedResult.err) return verifyIfEmailIsUsedResult;

        const hashedPassword = this.hashService.hashUserPassword(form.password);
        const createUserResult = await this.userRepository.createCustomer({...form, password: hashedPassword});
        if(createUserResult.err) return createUserResult;

        return Ok(undefined);
    }

    private async verifyIfEmailIsUsed(email: string): Promise<Result<void, DatabaseError | UserAlreadyInSystem>> {
        const userWithSameEmail = await this.userRepository.findByEmail(email);
        if(userWithSameEmail.ok) return Err(new UserAlreadyInSystem(email));

        if(userWithSameEmail.val instanceof NotFoundError) return Ok(undefined);
        return userWithSameEmail as Err<DatabaseError>;
    }
}
