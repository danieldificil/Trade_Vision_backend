import {CustomerRepository} from "@/InterfaceAdapters/repository/CustomerRepository";
import CustomerListUseCase from "@/AplicationBusiness/useCases/customer/CustomerListUseCase";
import UserModelFactory from "@/Main/factories/repositories/models/UserModelFactory";
import {ICustomerListUseCase} from "@/EnterpriseBusiness/useCases/customer/CustomerListUseCases";

export default function CustomerListUseCaseFactory(): ICustomerListUseCase {
    const userRepository = new CustomerRepository(UserModelFactory());
    return new CustomerListUseCase(userRepository);
}
