import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import UserListUseCase from "@/AplicationBusiness/useCases/user/UserListUseCase";
import UserModelFactory from "@/Main/factories/repositories/models/UserModelFactory";

export default function UserListUseCaseFactory(){
    const userRepository = new UserRepository(UserModelFactory());
    return new UserListUseCase(userRepository);
}
