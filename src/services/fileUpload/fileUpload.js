import mongoose from "mongoose"
import multer from "multer"
import { AppError } from "../../utils/appError.js"

export const fileUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, new mongoose.Types.ObjectId + "-" + file.originalname)
    }
  })

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true)
    } else {
      cb(new AppError('image only', 401), false)
    }
  }

  const upload = multer({ storage, fileFilter })
  return upload
}


export const uploadSingleFile = fieldName => fileUpload().single(fieldName)
export const uploadArrayOfFiles = fieldName => fileUpload().array(fieldName, 10)
export const uploadFields = fields => fileUpload().fields(fields)


