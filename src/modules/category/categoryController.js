import { catchError } from "../../middleware/catchError.js";
import { categoryModel } from "../../../database/models/categoryModel.js";
import slugify from "slugify";
import { deleteOne, getone } from "../../sharedFiles/handler.js";
import { Apifeatures } from "../../utils/APIFeatures.js";

const addCategory =catchError( async(req,res,next)=>{

    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = new categoryModel(req.body)
    console.log(category);
    await category.save()  
    
    res.json({message:"Success",category})
})

const gettAllCategores =catchError( async(req,res,next)=>{
    let apifeatuers = new Apifeatures(categoryModel.find(), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let categories = await apifeatuers.mongoosequery;
  res.json({ message: "Categories:", categories });
})

const gettSingleCategores = getone(categoryModel)

const deleteSingleCategores = deleteOne(categoryModel)

const updateSingleCategores = catchError(async(req,res,next)=>{
    if(req.body.name) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.image = req.file.filename
    let category = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !category && res.status(404).json({message:"Category Not Found"})
    category && res.json({message:"Success",category})
})

export{
    addCategory,
    gettAllCategores,
    gettSingleCategores,
    deleteSingleCategores,
    updateSingleCategores,  
}

