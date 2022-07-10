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
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to create a new user", async () => {
    const response = await request(app).post("/accounts/create").send(user);

    expect(response.body.name).toBe(user.name);
    expect(response.body.password).toBe(user.password);
    expect(response.body.email).toBe(user.email);
    expect(response.body.id).toBeDefined();
    expect(response.status).toBe(201);
  });
  it("should not be able to create a new user when email without name", async () => {
    const response = await request(app).post("/accounts/create").send({
      email: user.email,
      password: user.password,
    });

    expect(response.body.errors.name).toBeDefined();
    expect(response.status).toBe(400);
  });
  it("should not be able to create a new user when email without email", async () => {
    const response = await request(app).post("/accounts/create").send({
      name: user.name,
      password: user.password,
    });

    expect(response.body.errors.email).toBeDefined();
    expect(response.status).toBe(400);
  });
  it("should not be able to create a new user when email without password", async () => {
    const response = await request(app).post("/accounts/create").send({
      name: user.name,
      email: user.email,
    });

    expect(response.body.errors.password).toBeDefined();
    expect(response.status).toBe(400);
  });
});
