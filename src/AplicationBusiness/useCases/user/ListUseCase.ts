import {Ok, Result} from "ts-results";
import IUserRepository from "@/AplicationBusiness/repository/IUserRepository";
import {Auth} from "@/AplicationBusiness/decorators/Auth";
import {
    IListUseCase,
    ListForm,
    ListResult,
    ListUseCaseContext,
    ListUseCaseErrors,
} from "@/EnterpriseBusiness/useCases/user/ListUseCases";
import {UserType} from "@/EnterpriseBusiness/entities/user.entity";
import ValidateForm from "@/AplicationBusiness/decorators/ValidateForm";
import validators from "@/AplicationBusiness/validators/Validators";

export default class ListUseCase implements IListUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    @Auth([UserType.Admin])
    @ValidateForm({
        type: validators.string().optional(),
        pageSize: validators.number().optional(),
        page: validators.number().optional()
    })

    async execute(form: ListForm, context: ListUseCaseContext): Promise<Result<ListResult, ListUseCaseErrors>> {

        const where: ListForm = {}
        if (form.type) where.type = form.type

        const paginateUsersResolve = await this.userRepository.paginateUsers({
            where: {
                ...where,
            },
            pageSize: form.pageSize || 10,
            page: form.page || 1
        })

        if(paginateUsersResolve.err) return paginateUsersResolve;
        const {page, pageSize, total, items} = paginateUsersResolve.val;

        return Ok({
            pageSize,
            page,
            total,
            users: items,
        });
    }
}
