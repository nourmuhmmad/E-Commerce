import express from "express";
import { addsubcategory, deleteSingleSupcategores, gettAllSupcategores, gettSingleSupcategores, updateSingleSupcategores } from "./subCategoryController.js";
import { validation } from "../../middleware/validation.js";
import { addSupatgoryVal, updateSupcategoryVal } from "./subCategoryValdation.js";
import { paramsIdVal } from "../../sharedFiles/paramsIdVal.js";

const supcategoryRouter = express.Router({ mergeParams: true })

supcategoryRouter
    .route('/')
    .post(validation(addSupatgoryVal), addsubcategory)
    .get(gettAllSupcategores)

supcategoryRouter
    .route('/:category')
    .get(validation(paramsIdVal), gettSingleSupcategores)

supcategoryRouter
    .route('/:id')
    .put(validation(updateSupcategoryVal), updateSingleSupcategores)
    .delete(validation(paramsIdVal), deleteSingleSupcategores)

export default supcategoryRouter

