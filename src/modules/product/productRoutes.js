import express from "express";
import { addproduct, deleteSingleproducts, gettAllproducts, gettSingleproducts, updateSingleproducts } from "./productController.js";
import { validation } from "../../middleware/validation.js";
import { uploadFields, uploadSingleFile } from "../../services/fileUpload/fileUpload.js";
import { paramsIdVal } from "../../sharedFiles/paramsIdVal.js";
import { addproductVal, updateproductVal } from "./productValdation.js";

const productRouter = express.Router()

productRouter
    .route('/')
    .post(uploadFields([{name:'imgCover',maxCount:1},{name:'images',maxCount:10}]),validation(addproductVal), addproduct)
    .get(gettAllproducts) 

productRouter  
    .route('/:id')
    .get(validation(paramsIdVal),gettSingleproducts)
    .put(uploadFields([{name:'imgCover',maxCount:1},{name:'images',maxCount:10}]),validation(updateproductVal),updateSingleproducts)
    .delete(validation(paramsIdVal),deleteSingleproducts)

export default productRouter

