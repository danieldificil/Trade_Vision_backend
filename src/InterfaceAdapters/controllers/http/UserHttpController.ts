import {Ok} from "ts-results";
import {IAuthProvider} from "@/AplicationBusiness/provider/AuthContextProvider";
import {HttpController} from "@/InterfaceAdapters/controllers/http/HttpController";
import {HttpRequest, HttpResult, HttpStatus} from "@/InterfaceAdapters/gateway/http/Http.types";
import {Post, Route} from "@/InterfaceAdapters/gateway/http/HttpDecorators";
import {IListUseCase} from "@/EnterpriseBusiness/useCases/user/ListUseCases";
import {
    RegisterForm,
    IRegisterUseCase
} from "@/EnterpriseBusiness/useCases/user/RegisterUseCase";

@Route("/api/user")
export default class UserHttpController extends HttpController {

    constructor(
        readonly authContextProvider: IAuthProvider<string>,
        readonly customerRegisterUseCase: IRegisterUseCase,
        readonly customerListUseCase: IListUseCase,
    ) {
        super();
    }

    @Post('/register')
    async create(req: HttpRequest): Promise<HttpResult> {

        const form = req.body as RegisterForm;

        const useCaseResult = await this.customerRegisterUseCase.execute(form);
        if (useCaseResult.err) return useCaseResult;

        return Ok({
            status: HttpStatus.ok,
        });
    }
}
