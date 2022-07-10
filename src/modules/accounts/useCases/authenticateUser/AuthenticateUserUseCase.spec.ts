import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { faker } from "@faker-js/faker";
import { AppError } from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });
  it("should be able to authenticate an user", async () => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const { id } = await usersRepositoryInMemory.create(user);

    const authenticateResp = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(authenticateResp).toBe(id);
  });

  it("should not be able to authenticate an user with wrong email", async () => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await usersRepositoryInMemory.create(user);

    await expect(
      authenticateUserUseCase.execute({
        email: faker.internet.email(),
        password: user.password,
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
  it("should not be able to authenticate an user with wrong password", async () => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await usersRepositoryInMemory.create(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: faker.internet.password(),
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
