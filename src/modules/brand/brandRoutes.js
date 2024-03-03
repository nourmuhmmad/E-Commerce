import express from "express";
import { uploadSingleFile } from "../../services/fileUpload/fileUpload.js";
import { validation } from "../../middleware/validation.js";
import { addbrand, deleteSingleBrands, gettAllBrands, gettSingleBrands, updateSingleBrands } from "./brandController.js";
import { addBrandVal, updateBrandVal } from "./brandValdation.js";
import { paramsIdVal } from "../../sharedFiles/paramsIdVal.js";

const BrandRouter = express.Router()

BrandRouter
    .route('/')
    .post(uploadSingleFile('logo'),validation(addBrandVal), addbrand)
    .get(gettAllBrands) 

BrandRouter  
    .route('/:id')
    .get(validation(paramsIdVal),gettSingleBrands)
    .put(uploadSingleFile('img'),validation(updateBrandVal),updateSingleBrands)
    .delete(validation(paramsIdVal),deleteSingleBrands)

export default BrandRouter

