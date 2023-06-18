import JwtAdapter from "@/Main/adapters/JwtAdapter";
import {CustomerRepository} from "@/InterfaceAdapters/repository/CustomerRepository";
import {CustomerLoginUseCase} from "@/AplicationBusiness/useCases/auth/CustomerLoginUseCase";
import HashService from "@/InterfaceAdapters/services/HashService";
import TokenService from "@/InterfaceAdapters/services/TokenService";
import BcryptAdapter from "@/Main/adapters/BcryptAdapter";
import {ICustomerLoginUseCase} from "@/EnterpriseBusiness/useCases/auth/LoginUseCases";
import UserModelFactory from "@/Main/factories/repositories/models/UserModelFactory";

export default function CustomerLoginUseCaseFactory(): ICustomerLoginUseCase {
    const hashService = new HashService(new BcryptAdapter());
    const tokenService = new TokenService(new JwtAdapter());
    const userRepository = new CustomerRepository(UserModelFactory());
    return new CustomerLoginUseCase(userRepository, hashService, tokenService);

}
