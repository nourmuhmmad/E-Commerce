import express from "express"

import { protectedRoute } from "../auth/authController.js"
import { getallusers, softDelete, updateuser } from "./userController.js";

const userRouter = express.Router()
userRouter.put('/updateuser', protectedRoute, updateuser)
userRouter.put('/softDelete', protectedRoute, softDelete)
  .get(getallusers);

export default userRouter