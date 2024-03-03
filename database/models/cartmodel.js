import mongoose from "mongoose";

mongoose;
const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    cartItem: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
        },
        price: Number,
        quantity:{
          type : Number,
          default : 1,
        }
      },
    ],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number,
  },
  { timestamps: true }
);
export const cartmodel = mongoose.model("cart", CartSchema);
