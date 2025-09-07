import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/register", registerUser);

router.get("/me", verifyJWT, getCurrentUser);

export default router;
