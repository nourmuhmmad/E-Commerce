import { userModel } from "../../../database/models/userModel.js";
import { catchError } from "../../middleware/catchError.js";

const addaddress = catchError(async (req, res, next) => {
  let address = await userModel.findByIdAndUpdate(req.user.id, { $addToSet: { addresses: req.body } }, { new: true });
  !address && res.status(404).json({ message: "address not found" });
  address && res.json({ message: "success", address: address.addresses });
});

const removeaddress = catchError(async (req, res, next) => {
  let address = await userModel.findByIdAndUpdate(req.user.id, { $pull: { addresses: req.params.id } }, { new: true });
  !address && res.status(404).json({ message: "address not found" });
  address && res.json({ message: "Deleted!", address: address.addresses });
});


const getLoggetUseraddress = catchError(async (req, res, next) => {
  let addresses = await userModel.findById(req.user._id);
  addresses && res.json({ message: "success", addresses });
});

export {
  addaddress,
  removeaddress,
  getLoggetUseraddress
}
