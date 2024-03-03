import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { reviewModel } from "../../../database/models/reviewModel.js";
import { AppError } from "../../utils/appError.js";
import { Apifeatures } from "../../utils/APIFeatures.js";
import { deleteOne, getone } from "../../sharedFiles/handler.js";

const addreview = catchError(async (req, res, next) => {
  req.body.user = req.user._id;
  let isreviewexist = await reviewModel.findOne({user: req.user._id,product: req.body.product});
  if (isreviewexist) return next(new AppError("you reviewed before", 401));
  let review = new reviewModel(req.body);
  await review.save();
  res.json({ message: "Added!", review });
});


const getallreviews = catchError(async (req, res, next) => {
  let apifeatuers = new Apifeatures(reviewModel.find({}), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
    
  let reviews = await apifeatuers.mongoosequery;
  res.json({message: "SUCCESS!",reviews});
});


const getsinglereview = getone(reviewModel);


const updatreview = catchError(async (req, res, next) => {
  let review = await reviewModel.findOneAndUpdate({ _id: req.params.id, user: req.user.id },req.body,{ new: true });
  !review && res.status(404).json({ message: "review not found" });
  review && res.json({ message: "success", review });
});

const deletereview = deleteOne(reviewModel);

export { addreview, updatreview, getallreviews, getsinglereview, deletereview };
