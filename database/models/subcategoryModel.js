import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    image: String,

}, { timestamps: true })


export const subcategoryModel = mongoose.model('subcategory', schema)



