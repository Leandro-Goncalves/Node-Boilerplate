import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const accountsRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

accountsRoutes.post("/create", createUserController.handle);
accountsRoutes.post("/authenticate", authenticateUserController.handle);

export { accountsRoutes };
