import { userModel } from "../../../database/models/userModel.js";
import { catchError } from "../../middleware/catchError.js";

const addWishList = catchError(async (req, res, next) => {
  let wishlist = await userModel
    .findByIdAndUpdate(req.user.id,{ $addToSet: { wishlist: req.body.product } },{ new: true }).populate("wishlist");
  !wishlist && res.status(404).json({ message: "wishlist not found" });
  wishlist && res.json({ message: "success", wishlist });
});

const removewishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel.findByIdAndUpdate( req.user.id,{ $pull: { wishlist: req.params.id } },{ new: true }).populate("wishlist");
  !wishlist && res.status(404).json({ message: "wishlist not found" });
  wishlist && res.json({ message: "success", wishlist });
});

const getLoggetUserwishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel.findById(req.user.id).populate("wishlist");
  !wishlist && res.status(404).json({ message: "wishlist not found" });
  wishlist && res.json({ message: "success", wishlist: wishlist.wishlist });
});
export { addWishList, removewishlist, getLoggetUserwishlist };
