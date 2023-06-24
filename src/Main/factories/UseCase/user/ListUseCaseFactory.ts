import {CustomerRepository} from "@/InterfaceAdapters/repository/CustomerRepository";
import ListUseCase from "@/AplicationBusiness/useCases/user/ListUseCase";
import UserModelFactory from "@/Main/factories/repositories/models/UserModelFactory";
import {IListUseCase} from "@/EnterpriseBusiness/useCases/user/ListUseCases";

export default function ListUseCaseFactory(): IListUseCase {
    const userRepository = new CustomerRepository(UserModelFactory());
    return new ListUseCase(userRepository);
}
