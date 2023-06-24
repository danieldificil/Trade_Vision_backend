import {CustomerRepository} from "@/InterfaceAdapters/repository/CustomerRepository";
import ListUseCase from "@/AplicationBusiness/useCases/user/ListUseCase";
import UserModelFactory from "@/Main/factories/repositories/models/UserModelFactory";
import {ICustomerListUseCase} from "@/EnterpriseBusiness/useCases/user/CustomerListUseCases";

export default function ListUseCaseFactory(): ICustomerListUseCase {
    const userRepository = new CustomerRepository(UserModelFactory());
    return new ListUseCase(userRepository);
}
