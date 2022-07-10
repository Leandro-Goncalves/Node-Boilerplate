import { Validate } from "@utils/validation";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    Validate(req.body, {
      name: "required|string",
      email: "required|email",
      password: "required",
    });

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({ name, email, password });

    return res.status(201).json(user);
  }
}

export { CreateUserController };
