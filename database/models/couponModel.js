import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        require: true
    },
    expires: Date,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      product: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
      discount: {
        type: Number,
        required: true,
      },
      createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
}, { timestamps: true })


export const couponModel = mongoose.model('coupon', schema)



