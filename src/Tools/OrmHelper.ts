import {Connection, createConnection} from "typeorm";

export default class ORMHelper {
    public static connection: Connection;
    public static CreateConnection(): Promise<Connection> {
        return createConnection();
    }

    public static CreateConnectionByConfig(config): Promise<Connection> {
        return createConnection(config);
    }
}