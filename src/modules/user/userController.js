import { userModel } from "../../../database/models/userModel.js";
import { catchError } from "../../middleware/catchError.js";
import { Apifeatures } from "../../utils/APIFeatures.js";


const updateuser =catchError(async (req, res) => {
  const userId = req.user.userID;
  const user = await userModel.findById(userId);
  if (user) {
    await userModel.findByIdAndUpdate(userId, { age, name });
    return res.json({ message: "User updated successfully", user });
  }
  res.json({ message: "Can't find user" });
})

const softDelete = catchError(async (req, res) => {
  const userId = req.user.userID;
  const isdeleted = true;
  const user = await userModel.findById(userId);
  if (user) {
    await userModel.findByIdAndUpdate(userId, { isdeleted });
    return res.json({ message: "User deleted successfully", user });
  }
  res.json({ message: "Can't find user" });
})

const getallusers =catchError( async (req, res, next) => {
  let apifeatuers = new Apifeatures(userModel.find(), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let users = await apifeatuers.mongoosequery;
  res.json({ message: "All users:", users });
})

export {
  getallusers,
  updateuser,
  softDelete
}
