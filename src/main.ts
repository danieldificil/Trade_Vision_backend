import UserHttpController from "@/InterfaceAdapters/controllers/http/UserHttpController";
import HttpAuthProviderFactory from "@/Main/factories/providers/HttpAuthProviderFactory";
import CustomerLoginUseCaseFactory from "@/Main/factories/UseCase/CustomerLoginUseCaseFactory";
import CustomerRegisterUseCaseFactory from "@/Main/factories/UseCase/CustomerRegisterUseCaseFactory";
import CustomerListUseCaseFactory from "@/Main/factories/UseCase/CustomerListUseCaseFactory";
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
