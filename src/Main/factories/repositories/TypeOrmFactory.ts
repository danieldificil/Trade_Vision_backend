
// SingletonPattern
import {DataSource} from "typeorm";
import UserModel from "@/InterfaceAdapters/repository/models/UserModel";
import dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    "ssl": {
        "rejectUnauthorized": false
    },
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
