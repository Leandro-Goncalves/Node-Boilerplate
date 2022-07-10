import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
    });

    return user;
  }
}

export { UsersRepository };
