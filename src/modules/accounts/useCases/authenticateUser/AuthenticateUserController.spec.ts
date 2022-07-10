import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";
import { faker } from "@faker-js/faker";

let connection: Connection;

const user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await connection.manager.save(connection.manager.create("users", user));
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to authenticate a user", async () => {
    const response = await request(app).post("/accounts/authenticate").send({
      email: user.email,
      password: user.password,
    });

    expect(response.body.ok).toBe(true);
    expect(response.body.id).toBeDefined();
    expect(response.status).toBe(200);
  });
  it("should not be able to authenticate a user with no email", async () => {
    const response = await request(app).post("/accounts/authenticate").send({
      password: user.password,
    });

    expect(response.body.errors.email).toBeDefined();
    expect(response.status).toBe(400);
  });
  it("should not be able to authenticate a user with no password", async () => {
    const response = await request(app).post("/accounts/authenticate").send({
      email: user.email,
    });

    expect(response.body.errors.password).toBeDefined();
    expect(response.status).toBe(400);
  });
});
