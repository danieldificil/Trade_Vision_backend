import AuthContext from "@/EnterpriseBusiness/contexts/AuthContext";
import {UserModelRole} from "@/InterfaceAdapters/repository/models/UserModel";
import UseCase from "../useCase";
import DatabaseError from "../../errors/DatabaseError";
import User from "../../entities/user.entity";


export interface UserListForm {
    type?: UserModelRole,
    pageSize?: number,
    page?: number
}

export type userListResult = {
    users: User[],
    page: number,
    pageSize: number,
    total: number,
};

export type UserListUseCaseErrors = DatabaseError;

export type UserListUseCaseContext = {
    auth: AuthContext,
};

export type IUserListUseCase = UseCase<UserListForm, userListResult, UserListUseCaseErrors, UserListUseCaseContext>;
