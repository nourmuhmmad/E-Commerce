import express from "express";
import { addCategory, deleteSingleCategores, gettAllCategores, gettSingleCategores, updateSingleCategores } from "./categoryController.js";
import { validation } from "../../middleware/validation.js";
import { addCategoryVal, updateCategoryVal } from "./categoryValdation.js";
import { uploadSingleFile } from "../../services/fileUpload/fileUpload.js";
import { paramsIdVal } from "../../sharedFiles/paramsIdVal.js";

const categoryRouter = express.Router()

categoryRouter
    .route('/')
    .post(uploadSingleFile('img'),validation(addCategoryVal), addCategory)
    .get(gettAllCategores) 

categoryRouter  
    .route('/:id')
    .get(validation(paramsIdVal),gettSingleCategores)
    .put(uploadSingleFile('img'),validation(updateCategoryVal),updateSingleCategores)
    .delete(validation(paramsIdVal),deleteSingleCategores)

export default categoryRouter

