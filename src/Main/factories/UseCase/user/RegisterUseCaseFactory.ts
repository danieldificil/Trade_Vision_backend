import {CustomerRepository} from "@/InterfaceAdapters/repository/CustomerRepository";
import HashService from "@/InterfaceAdapters/services/HashService";
import BcryptAdapter from "@/Main/adapters/BcryptAdapter";
import UserModelFactory from "@/Main/factories/repositories/models/UserModelFactory";
import RegisterUseCase from "@/AplicationBusiness/useCases/user/RegisterUseCase";
import {ICustomerRegisterUseCase} from "@/EnterpriseBusiness/useCases/user/CustomerRegisterUseCase";

export default function RegisterUseCaseFactory(): ICustomerRegisterUseCase{
    const hashService = new HashService(new BcryptAdapter());
    const userRepository = new CustomerRepository(UserModelFactory());

    return new RegisterUseCase(userRepository, hashService);
}
