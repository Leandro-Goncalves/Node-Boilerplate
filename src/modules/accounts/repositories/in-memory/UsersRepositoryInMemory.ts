import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { email, name, password });
    this.users.push(user);

    return user;
  }
  async findById(id: string): Promise<User> {
    return this.users.find((u) => u.id === id);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((u) => u.email === email);
  }
}

export { UsersRepositoryInMemory };
