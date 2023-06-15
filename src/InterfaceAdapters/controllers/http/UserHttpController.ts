import {Ok} from "ts-results";
import {IAuthProvider} from "@/AplicationBusiness/provider/AuthContextProvider";
import {HttpController} from "@/InterfaceAdapters/controllers/http/HttpController";
import {HttpRequest, HttpResult, HttpStatus} from "@/InterfaceAdapters/gateway/http/Http.types";
import {Post, Route} from "@/InterfaceAdapters/gateway/http/HttpDecorators";
import {
    CustomerUserRegisterForm,
    ICustomerUserRegisterUseCase
} from "@/EnterpriseBusiness/useCases/user/CustomerUserRegisterUseCase";
import {IUserListUseCase} from "@/EnterpriseBusiness/useCases/user/UserListUseCases";

@Route("/api/user")
export default class UserHttpController extends HttpController {

    constructor(
        readonly authContextProvider: IAuthProvider<string>,
        readonly customerUserRegisterUseCase: ICustomerUserRegisterUseCase,
        readonly userListUseCase: IUserListUseCase,
    ) {
        super();
    }

    @Post('/register')
    async create(req: HttpRequest): Promise<HttpResult> {
        const form = req.body as CustomerUserRegisterForm;

        const useCaseResult = await this.customerUserRegisterUseCase.execute(form);
        if (useCaseResult.err) return useCaseResult;

        return Ok({
            status: HttpStatus.ok,
        });
    }
}
