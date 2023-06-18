import {Err, Ok, Result} from "ts-results";
import UserModel, {UserModelRole} from "@/InterfaceAdapters/repository/models/UserModel";
import {
    FindOneForm,
    PaginateForm,
    RepositoryModel
} from "@/InterfaceAdapters/repository/RepositoryModel";
import ICustomerRepository, {
    CreateAccountRepository,
    CreateAdminRepository,
    FindAllUsersForm,
    paginateUsersResult,
    userKeyToUserModelKeyMap,
    UpdateUserForm,
} from "../../AplicationBusiness/repository/IUserRepository";
import DatabaseError from "../../EnterpriseBusiness/errors/DatabaseError";
import User, {UserType} from "../../EnterpriseBusiness/entities/user.entity";
import NotFoundError from "../../EnterpriseBusiness/errors/NotFoundError";

const userModelTypeMapper: Record<UserModelRole, UserType> = {
    [UserModelRole.Admin]: UserType.Admin,
    [UserModelRole.Customer]: UserType.Customer,
}

export class CustomerRepository implements ICustomerRepository {

    constructor(readonly userModel: RepositoryModel<UserModel>) {
    }

    async createCustomer(user: CreateAccountRepository): Promise<Result<undefined, DatabaseError>> {
        const res = await this.userModel.create({...user, type: UserModelRole.Customer});
        if (res.err) return res;

        return Ok(undefined);
    }

    async createAdmin(user: CreateAdminRepository): Promise<Result<undefined, DatabaseError>> {
        const res = await this.userModel.create({...user, type: UserModelRole.Admin});
        if (res.err) return res;
        if (!res.val) return Err(new NotFoundError("User"));

        return Ok(undefined);
    }

    async findByEmail(email: string): Promise<Result<User, NotFoundError | DatabaseError>> {
        const res = await this.userModel.findOne({where: {email}});
        if (res.err) return res;
        if (!res.val) return Err(new NotFoundError("User"));
        const customerModel = res.val;

        return Ok({
            id: customerModel.id,
            email: customerModel.email,
            firstName: customerModel.firstName,
            lastName: customerModel.lastName,
            password: customerModel.password,
            type: userModelTypeMapper[customerModel.type],
        });
    }

    async findById(id: number): Promise<Result<User, NotFoundError | DatabaseError>> {
        const res = await this.userModel.findOne({where: {id}});
        if (res.err) return res;
        if (!res.val) return Err(new NotFoundError("User"));
        const userModel = res.val;

        return Ok({
            id: userModel.id,
            email: userModel.email,
            firstName: userModel.firstName,
            lastName: userModel.lastName,
            password: userModel.password,
            type: userModelTypeMapper[userModel.type],
        });
    }

    async findAll(query: { id?: number }): Promise<Result<User[], DatabaseError>> {
        const where: FindOneForm<UserModel>['where'] = {};
        if (query.id) where.id = query.id;

        const res = await this.userModel.find({where});
        if (res.err) return res;
        const customersModel = res.val;

        return Ok(customersModel.map((userModel) => ({
            id: userModel.id,
            email: userModel.email,
            firstName: userModel.firstName,
            lastName: userModel.lastName,
            password: userModel.password,
            type: userModelTypeMapper[userModel.type],
        })));
    }

    async paginateUsers<Fields extends keyof User>(query: FindAllUsersForm<Fields>): Promise<Result<paginateUsersResult<Fields>, DatabaseError>> {
        const fields = query.fields ? this.userToUserModelFields(query.fields) : undefined;


        const where: PaginateForm<UserModel>['where'] = {};
        if (query.where.type) where.type = query.where.type

        const paginate = await this.userModel.paginate({
            where: {
                ...where
            },
            page: query.page,
            pageSize: query.pageSize,
            select: fields,
        });
        if (paginate.err) return paginate;
        const usersModel = paginate.val;

        return Ok({
            items: usersModel.items.map(userColumns => this.userToEntity(userColumns)),
            total: usersModel.total,
            page: query.page,
            pageSize: query.pageSize,
        });
    }

    async updateCustomer(user: UpdateUserForm): Promise<Result<User, DatabaseError>> {
        const updateCustomerRes = await this.userModel.update(user);
        if (updateCustomerRes.err) return updateCustomerRes;
        const updateResponse = updateCustomerRes.val

        const response = this.userToEntity(updateResponse)

        return Ok(response);
    }

    private userToUserModelFields(fields: (keyof User)[]): (keyof UserModel)[] {
        return fields.map((field): (keyof UserModel)[] => {
            const mapField = userKeyToUserModelKeyMap[field];
            if (Array.isArray(mapField)) return mapField;
            return [mapField];
        }).flat();
    }

    private userToEntity(userModel: UserModel): User {
        return {
            id: Number(userModel.id),
            firstName: userModel.firstName,
            lastName: userModel.lastName,
            email: userModel.email,
            password: userModel.password,
            type: userModelTypeMapper[userModel.type],
        }
    }
}
