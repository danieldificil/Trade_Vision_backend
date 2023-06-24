import {Ok} from "ts-results";
import {LoginResult, ICustomerLoginUseCase} from "@/EnterpriseBusiness/useCases/auth/LoginUseCases";
import {HttpController} from "@/InterfaceAdapters/controllers/http/HttpController";
import {HttpRequest, HttpResult, HttpStatus} from "@/InterfaceAdapters/gateway/http/Http.types";
import {Post, Route} from "@/InterfaceAdapters/gateway/http/HttpDecorators";
import User from "@/EnterpriseBusiness/entities/user.entity";

type CustomerLoginForm = Omit<
    User,
    'id' &
    'type' &
    'password'
    >

@Route("/api/user")
export default class AuthHttpController extends HttpController {

    constructor(
        readonly loginUseCase: ICustomerLoginUseCase) {
        super();
    }

    @Post('/login')
    async login(req: HttpRequest): Promise<HttpResult> {

        const form = req.body as CustomerLoginForm

        const useCaseResult = await this.loginUseCase.execute(form)
        if (useCaseResult.err) return useCaseResult
        const customer: LoginResult = useCaseResult.unwrap()

        return Ok({
            status: HttpStatus.ok,
            body: {
                customer
            }
        });
    }

    @Post('/logout')
    async logout(req: HttpRequest): Promise<HttpResult> {

        const form = req.body as CustomerLoginForm

        const useCaseResult = await this.loginUseCase.execute(form)
        if (useCaseResult.err) return useCaseResult
        const customer: LoginResult = useCaseResult.unwrap()

        return Ok({
            status: HttpStatus.ok,
            body: {
                customer
            }
        });
    }
}
