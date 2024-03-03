import express from "express";
import { validation } from "../../middleware/validation.js";
import { addcoupon, deletecoupon, getallcoupons, getsinglecoupon, updatecoupon } from "./coupon.controller.js";
import { addcouponval, updatecouponVal } from "./coupon.Validation.js";
import { paramsIdVal } from "../../sharedFiles/paramsIdVal.js";
import { allowTo, protectedRoute } from "../auth/authController.js";

const couponroute = express.Router();

couponroute.use(protectedRoute, allowTo("admin", "user"));

couponroute
  .route("/")
  .post(validation(addcouponval), addcoupon)
  .get(getallcoupons);

couponroute
  .route("/:id")
  .get(validation(paramsIdVal), getsinglecoupon)
  .put(validation(updatecouponVal), updatecoupon)
  .delete(validation(paramsIdVal), deletecoupon);
  
export default couponroute;
