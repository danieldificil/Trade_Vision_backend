import {CustomerRepository} from "@/InterfaceAdapters/repository/CustomerRepository";
import HashService from "@/InterfaceAdapters/services/HashService";
import BcryptAdapter from "@/Main/adapters/BcryptAdapter";
import UserModelFactory from "@/Main/factories/repositories/models/UserModelFactory";
import CustomerRegisterUseCase from "@/AplicationBusiness/useCases/customer/CustomerRegisterUseCase";
import {ICustomerRegisterUseCase} from "@/EnterpriseBusiness/useCases/customer/CustomerRegisterUseCase";

export default function CustomerRegisterUseCaseFactory(): ICustomerRegisterUseCase{
    const hashService = new HashService(new BcryptAdapter());
    const userRepository = new CustomerRepository(UserModelFactory());

    return new CustomerRegisterUseCase(userRepository, hashService);
}
