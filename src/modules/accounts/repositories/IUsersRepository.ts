import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUsersRepository };
