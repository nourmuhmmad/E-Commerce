import express from "express";
import { allowTo, protectedRoute } from "../auth/authController.js";
import { validation } from "../../middleware/validation.js";
import { addwhishlistval } from "./wishlistValidation.js";
import { addWishList, getLoggetUserwishlist, removewishlist } from "./wishlistcontroller.js";
import { paramsIdVal } from "../../sharedFiles/paramsIdVal.js";

const whishlistRouter = express.Router();

whishlistRouter
  .route("/")
  .post(protectedRoute,allowTo("user", "admin"),validation(addwhishlistval),addWishList)
  .get(getLoggetUserwishlist)

whishlistRouter
  .route("/:id")
  .delete(protectedRoute,allowTo("admin", "user"),validation(paramsIdVal),removewishlist);

export default whishlistRouter;
