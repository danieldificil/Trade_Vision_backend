import {Result} from "ts-results";
import UserModel, {UserModelRole} from "@/InterfaceAdapters/repository/models/UserModel";
import DatabaseError from "../../EnterpriseBusiness/errors/DatabaseError";
import User from "../../EnterpriseBusiness/entities/user.entity";
import NotFoundError from "../../EnterpriseBusiness/errors/NotFoundError";
export type CreateUserRepository = Omit<User, 'id' | 'lastLoginAttempted'>
export type CreateAdminRepository = Omit<CreateUserRepository, 'type'>
export type CreateCooperatingRepository = Omit<CreateUserRepository, 'type'>
export type CreateAccountRepository = Omit<CreateUserRepository, 'type'>

export const userKeyToUserModelKeyMap: Record<keyof User, (keyof UserModel)[] | keyof UserModel> = {
    id: "id",
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    password: "password",
    type: "type",
}

export enum UserOrderDirection {
    Asc = 'ASC',
    Desc = 'DESC'
}

export type FindAllUsersForm<Fields extends keyof User> = {
    where: {
        type?: UserModelRole
    },
    page: number,
    pageSize: number,
    fields?:  Fields[],
};

export interface paginateUsersResult<Fields extends keyof User> {
    items: Pick<User, Fields>[],
    total: number,
    page: number,
    pageSize: number,
}
type KeysToUpdateUserForm = { id: User['id'], type?: UserModelRole }

export type UpdateUserForm = KeysToUpdateUserForm & Partial<Omit<User, 'id' | 'type'>>;

export default interface IUserRepository {
    createAdmin(user: CreateAdminRepository): Promise<Result<void, DatabaseError>>;
    createCustomer(user: CreateCooperatingRepository): Promise<Result<void, DatabaseError>>;

    findByEmail(email: string): Promise<Result<User, NotFoundError | DatabaseError>>;
    findById(id: number): Promise<Result<User, NotFoundError | DatabaseError>>;
    findAll(query: {id?: number}): Promise<Result<User[], DatabaseError>>;
    paginateUsers<Fields extends keyof User>(query: FindAllUsersForm<Fields>): Promise<Result<paginateUsersResult<Fields>, DatabaseError>>,
    updateCustomer(user: UpdateUserForm): Promise<Result<User, DatabaseError>>,
}
