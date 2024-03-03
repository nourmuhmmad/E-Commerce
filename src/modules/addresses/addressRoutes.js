import express from "express";
import { allowTo, protectedRoute } from "../auth/authController.js";
import { validation } from "../../middleware/validation.js";
import { addAddressval } from "./addressValidation.js";
import { addaddress, getLoggetUseraddress, removeaddress } from "./addressController.js";
import { paramsIdVal } from "../../sharedFiles/paramsIdVal.js";


const addressRouter = express.Router();

addressRouter
  .route("/")
  .post(protectedRoute,allowTo("user", "admin"),validation(addAddressval),addaddress)
  .get(protectedRoute, allowTo("user", "admin"), getLoggetUseraddress);

  addressRouter
  .route("/:id")
  .delete(protectedRoute,allowTo("admin", "user"),validation(paramsIdVal),removeaddress);

export default addressRouter;
