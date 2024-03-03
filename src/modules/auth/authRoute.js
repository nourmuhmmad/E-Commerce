import express from "express";
import { validation } from "../../middleware/validation.js";
import { changepassval, signinval, signupval } from "./authValidation.js";
import { checkEmail } from "../../middleware/checkmail.js";
import { allowTo, changePassword, protectedRoute, signin, signup } from "./authController.js";


const authRouter = express.Router();

authRouter.post("/signup",validation(signupval),checkEmail,signup);
authRouter.post("/signin",protectedRoute,allowTo("admin", "user"),validation(signinval),signin);
authRouter.put("/changepassword",protectedRoute,validation(changepassval),changePassword);

export default authRouter;
