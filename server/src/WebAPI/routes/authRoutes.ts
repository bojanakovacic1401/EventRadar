import { Router } from "express";
import { pool } from "../../config/db";
import { UserRepository } from "../../Database/repositories/UserRepository";
import { UserService } from "../../Services/UserService";
import { AuthController } from "../controllers/AuthController";
import { authenticate } from "../../middleware/authMiddleware";

const router = Router();

const userRepository = new UserRepository(pool);
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.me);

export default router;