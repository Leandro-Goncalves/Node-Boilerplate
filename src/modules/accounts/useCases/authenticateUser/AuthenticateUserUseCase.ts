import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    return user.id;
  }
}

export { AuthenticateUserUseCase };
