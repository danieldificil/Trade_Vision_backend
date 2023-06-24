import UserHttpController from "@/InterfaceAdapters/controllers/http/UserHttpController";
import HttpAuthProviderFactory from "@/Main/factories/providers/HttpAuthProviderFactory";
import CustomerLoginUseCaseFactory from "@/Main/factories/UseCase/auth/LoginUseCaseFactory";
import CustomerRegisterUseCaseFactory from "@/Main/factories/UseCase/user/RegisterUseCaseFactory";
import CustomerListUseCaseFactory from "@/Main/factories/UseCase/user/ListUseCaseFactory";
import AuthHttpController from "./InterfaceAdapters/controllers/http/AuthHttpController";
import "dotenv/config";

import webserver from "./Main/factories/webserverFactory";


const authProvider = HttpAuthProviderFactory();

const authHttpController = new AuthHttpController(CustomerLoginUseCaseFactory());
const userHttpController = new UserHttpController(
    authProvider,
    CustomerRegisterUseCaseFactory(),
    CustomerListUseCaseFactory(),
);

webserver.registerController(authHttpController);
webserver.registerController(userHttpController);
webserver.start(3000);
