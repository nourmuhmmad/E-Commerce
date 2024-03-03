import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/userModel.js";
import { AppError } from "../../utils/appError.js";

const signup = catchError(async (req, res, next) => {
  let user = new userModel(req.body);
  let token = jwt.sign({ userID: user._id, role: user.role }, "ayah");
  await user.save();
  res.json({ message: "success", token });
});


const signin = async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign({ userID: user._id, role: user.role }, "ayah");
    return res.json({ message: "signin", token });
  }
  next(new AppError("incorrect pass or email", 401));
};


const changePassword = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.user._id);
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign({ userID: user._id, role: user.role }, "ayah");
    await userModel.findByIdAndUpdate(req.user._id, {
      password: req.body.newpassword,
      passwordChangedAt: Date.now(),
    });
    return res.json({ message: "changed", token });
  }
  next(new AppError("incorrect pass", 401));
});


const protectedRoute = async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return new AppError("user not found", 404);
  let decoded = jwt.verify(token, "ayah");
  let user = await userModel.findById(decoded.userID);
  if (!user) return new AppError("user not found", 404);
  if (user?.passwordChangedAt) {
    let time = parseInt(user?.passwordChangedAt.getDate() / 1000);
    if (time > decoded.iat) return new AppError("invalid token!", 404);
  }
  req.user = user;
  next();
};


const allowTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return new AppError("you are not authorized", 401);
    next();
  });
};

export {
  signin,
  signup,
  changePassword,
  protectedRoute,
  allowTo
};
