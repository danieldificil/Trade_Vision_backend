import {Ok} from "ts-results";
import {ILoginUseCase} from "@/EnterpriseBusiness/useCases/auth/LoginUseCases";
import {HttpController} from "@/InterfaceAdapters/controllers/http/HttpController";
import {HttpRequest, HttpResult, HttpStatus} from "@/InterfaceAdapters/gateway/http/Http.types";
import {Post, Route} from "@/InterfaceAdapters/gateway/http/HttpDecorators";

type LoginForm = { email: string, password: string }

@Route("/api/user")
export default class AuthHttpController extends HttpController {

    constructor(
        readonly loginUseCase: ILoginUseCase) {
        super();
    }

    @Post('/login')
    async login(req: HttpRequest): Promise<HttpResult> {
        const form = req.body as LoginForm
        const useCaseResult = await this.loginUseCase.execute(form);
        if (useCaseResult.err) return useCaseResult;
        return Ok({
            status: HttpStatus.ok,
        });
    }

    @Post('/logout')
    async logout(req: HttpRequest): Promise<HttpResult> {
        const form = req.body as LoginForm;
        const useCaseResult = await this.loginUseCase.execute(form);
        if (useCaseResult.err) return useCaseResult;
        return Ok({
            status: HttpStatus.ok,
        });
    }
}
