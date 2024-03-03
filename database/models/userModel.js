import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'too short username']
    },
    email: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minLength: [3,'too short password']
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: ["user"]
    },
    isBlocked:{
        type:Boolean,
        default: false
    },
    isActive:{
        type:Boolean,
        default: true
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    addresses: [
        {
          phone: String,
          street: String,
          city: String,
        },
      ],
    passwordChangedAt: Date,
    image: String,
}, { timestamps: true })


schema.pre("save", function () {
    if (this.password) bcrypt.hashSync(this.password, 8);
  });
schema.pre("findOneAndUpdate", function () {
    if (this._update.password) bcrypt.hashSync(this._update.password, 8);
  });
  
export const userModel = mongoose.model('user', schema)



