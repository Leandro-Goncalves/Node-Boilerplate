import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const database =
    process.env.NODE_ENV === "test" ? "db_test" : defaultOptions.database;

  const conection = await createConnection(
    Object.assign(defaultOptions, { database })
  );

  return conection;
};
