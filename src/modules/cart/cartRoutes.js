import express from "express";
import { allowTo, protectedRoute } from "../auth/authController.js";
import { validation } from "../../middleware/validation.js";
import { addcartval, updateQuantityVal } from "./cartValidation.js";
import { addcart, clearUsercart, getLoggetUsercart, removeitemfromcart, updatequantity } from "./cartController.js";
import { paramsIdVal } from "../../sharedFiles/paramsIdVal.js";

const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(protectedRoute,allowTo("user", "admin"), validation(addcartval),addcart)
  .delete(protectedRoute, allowTo("user", "admin"), clearUsercart)
  .get(protectedRoute, allowTo("user", "admin"), getLoggetUsercart);
cartRouter
  .route("/:id")
  .delete(protectedRoute,allowTo("admin", "user"),validation(paramsIdVal),removeitemfromcart)
  .put(protectedRoute,allowTo("user", "admin"),validation(updateQuantityVal),updatequantity);

export default cartRouter;
