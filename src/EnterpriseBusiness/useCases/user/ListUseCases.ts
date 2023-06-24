import AuthContext from "@/EnterpriseBusiness/contexts/AuthContext";
import {UserModelRole} from "@/InterfaceAdapters/repository/models/UserModel";
import UseCase from "../useCase";
import DatabaseError from "../../errors/DatabaseError";
import User from "../../entities/user.entity";


export interface ListForm {
    type?: UserModelRole,
    pageSize?: number,
    page?: number
}

export type ListResult = {
    users: User[],
    page: number,
    pageSize: number,
    total: number,
};

export type ListUseCaseErrors = DatabaseError

export type ListUseCaseContext = {
    auth: AuthContext,
};

export type IListUseCase = UseCase<
    ListForm,
    ListResult,
    ListUseCaseErrors,
    ListUseCaseContext
    >
