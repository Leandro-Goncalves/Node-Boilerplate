import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { Validate } from "@utils/validation";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    Validate(req.body, {
      email: "required|email",
      password: "required",
    });

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const id = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return res.status(200).send({
      ok: true,
      id,
    });
  }
}

export { AuthenticateUserController };
