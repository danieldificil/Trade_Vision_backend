import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import HashService from "@/InterfaceAdapters/services/HashService";
import BcryptAdapter from "@/Main/adapters/BcryptAdapter";
import UserModelFactory from "@/Main/factories/repositories/models/UserModelFactory";
import CustomerUserRegisterUseCase from "@/AplicationBusiness/useCases/user/CustomerUserRegisterUseCase";

export default function CustomerUserRegisterUseCaseFactory(){
    const hashService = new HashService(new BcryptAdapter());
    const userRepository = new UserRepository(UserModelFactory());

    return new CustomerUserRegisterUseCase(userRepository, hashService);
}
