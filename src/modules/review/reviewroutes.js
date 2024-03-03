import express from "express";
import { allowTo, protectedRoute } from "../auth/authController.js";
import { validation } from "../../middleware/validation.js";
import { addreview, deletereview, getallreviews, getsinglereview, updatreview } from "./reviewController.js";
import { addreivewval, updatereivewVal } from "./reviewValidation.js";
import { paramsIdVal } from "../../sharedFiles/paramsIdVal.js";

const reviewroute = express.Router();

reviewroute
  .route("/")
  .post(protectedRoute,allowTo("admin", "user"),validation(addreivewval),addreview)
  .get(getallreviews);

reviewroute
  .route("/:id")
  .get(validation(paramsIdVal), getsinglereview)
  .put(protectedRoute,allowTo("user"),validation(updatereivewVal),updatreview)
  .delete(protectedRoute,allowTo("admin", "user"),validation(paramsIdVal),deletereview);


  export default reviewroute;
