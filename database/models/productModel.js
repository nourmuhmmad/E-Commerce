import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'too short title name']
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLenght: [10, "too short"],
        maxLength: [200, "too long!"],    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    price:{
        type:Number,
        required:true,
        min: 0
    },
    priceAfterDiscount:{
        type:Number,
        required:true,
        min: 0
    },
    brandId:{
        type:mongoose.Types.ObjectId,
        ref:'brand'
    },
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    subcategoryId:{
        type:mongoose.Types.ObjectId,
        ref:'subcategory'
    },
    rateCount:{
        type:Number,
        min: 0,
        default: 0,
    },
    rateAvg:{
        type:Number,
        max: 5,
        min: 0,
    },
    quantity:{
        type: Number,
        min : 0,
        default:1
    },

    imgCover: String,
    images: String,
    sold: Number,

}, { timestamps: true })

schema.post("init", function (doc) {
  if (doc.imgCover || doc.images) {
    doc.imgCover = process.env.BASEURL + "uploads/" + doc.imgCover;
    doc.images = doc.images?.map(
      (img) => process.env.BASEURL + "uploads/" + img
    );
  }
});
schema.virtual("myreview", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});
schema.pre("findOne", function () {
  this.populate("myreview");
});

export const productModel = mongoose.model('product', schema)



