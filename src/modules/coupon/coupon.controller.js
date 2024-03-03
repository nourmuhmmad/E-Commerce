import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { couponModel } from "../../../database/models/couponModel.js";
import { AppError } from "../../utils/appError.js";
import { Apifeatures } from "../../utils/APIFeatures.js";
import { deleteOne, getone } from "../../sharedFiles/handler.js";

const addcoupon = catchError(async (req, res, next) => {
  req.body.user = req.user._id;
  let iscouponexist = await couponModel.findOne({
    code: req.body.code,
  });
  if (iscouponexist) return next(new AppError("coupon already exists!", 401));
  let coupon = new couponModel(req.body);
  await coupon.save();
  res.json({ message: "Added!", coupon });
});

const getallcoupons = catchError(async (req, res, next) => {
  let apifeatuers = new Apifeatures(couponModel.find({}), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let coupons = await apifeatuers.mongoosequery;
  res.json({message: "SUCCESS!",coupons});
});

const getsinglecoupon = getone(couponModel);

const updatecoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findOneAndUpdate({ _id: req.params.id, user: req.user._id },req.body,{ new: true });
  !coupon && res.status(404).json({ message: "coupon not found" });
  coupon && res.json({ message: "success", coupon });
});

const deletecoupon = deleteOne(couponModel);

export {
  addcoupon,
  updatecoupon,
  getallcoupons,
  getsinglecoupon,
  deletecoupon,
};
