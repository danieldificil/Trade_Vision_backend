
// SingletonPattern
import {DataSource} from "typeorm";

import UserModel from "@/InterfaceAdapters/repository/models/UserModel";

const dataSource = new DataSource({
    type: "mysql",
    host: "",
    port: 0,
    database: "",
    username: "",
    password: "",
    synchronize: false,
    logging: true,
    entities: [
        UserModel,
    ],
});


const mainModels = {
    user: dataSource.getRepository(UserModel),
}

dataSource.initialize();

export default function typeOrmFactory() {
    return {
        main: {
            dataSource,
            models: mainModels,
        },
    };
}
