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
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    logo: String
}, { timestamps: true })

schema.post("init", function (doc) {
    doc.logo = process.env.BASEURL + "uploads/" + doc.logo;
});

export const brandModel = mongoose.model('brand', schema)
