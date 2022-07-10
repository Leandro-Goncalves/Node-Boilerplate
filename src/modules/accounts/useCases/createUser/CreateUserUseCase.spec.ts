import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { faker } from "@faker-js/faker";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to create a new user", async () => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const userResp = await createUserUseCase.execute(user);

    expect(userResp).toHaveProperty("id");
    expect(userResp.email).toBe(user.email);
    expect(userResp.name).toBe(user.name);
    expect(userResp.password).toBe(user.password);
  });

  it("should not be able to create a new user with same email", async () => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await usersRepositoryInMemory.create(user);

    await expect(
      createUserUseCase.execute({
        name: faker.name.findName(),
        email: user.email,
        password: faker.internet.password(),
      })
    ).rejects.toEqual(new AppError("User already exists"));
  });
});
