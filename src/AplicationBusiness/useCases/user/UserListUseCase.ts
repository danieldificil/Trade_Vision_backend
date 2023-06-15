import {Ok, Result} from "ts-results";
import IUserRepository from "@/AplicationBusiness/repository/IUserRepository";
import {Auth} from "@/AplicationBusiness/decorators/Auth";
import {
    IUserListUseCase,
    UserListForm,
    userListResult,
    UserListUseCaseContext,
    UserListUseCaseErrors,
} from "@/EnterpriseBusiness/useCases/user/UserListUseCases";
import {UserType} from "@/EnterpriseBusiness/entities/user.entity";
import ValidateForm from "@/AplicationBusiness/decorators/ValidateForm";
import validators from "@/AplicationBusiness/validators/Validators";

export default class UserListUseCase implements IUserListUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    @Auth([UserType.Admin, UserType.Employee])
    @ValidateForm({
        type: validators.string().optional(),
        pageSize: validators.number().optional(),
        page: validators.number().optional()
    })

    async execute(form: UserListForm, context: UserListUseCaseContext): Promise<Result<userListResult, UserListUseCaseErrors>> {
        const where: UserListForm = {}
        if (form.type) where.type = form.type

        const paginateUsersRes = await this.userRepository.paginateUsers({
            where: {
                ...where,
            },
            pageSize: form.pageSize || 10,
            page: form.page || 1,
            fields: [
                'id',
                'firstName',
                'lastName',
                'email',
                'password',
                'type',
            ]
        })

        if(paginateUsersRes.err) return paginateUsersRes;
        const {page, pageSize, total, items} = paginateUsersRes.val;

        return Ok({
            pageSize,
            page,
            total,
            users: items,
        });
    }
}
