import { subcategoryModel } from "../../../database/models/subcategoryModel.js";
import { catchError } from "../../middleware/catchError.js";
import slugify from "slugify";
import { deleteOne, getone } from "../../sharedFiles/handler.js";
import { Apifeatures } from "../../utils/APIFeatures.js";

const addsubcategory =catchError( async(req,res,next)=>{

    req.body.slug = slugify(req.body.name)
    let subcategory = new subcategoryModel(req.body)
    console.log(subcategory);
    await subcategory.save()  
    
    res.json({message:"Success",subcategory})
})

const gettAllSupcategores =catchError( async(req,res,next)=>{
    let filterObj = {}
    if (req.params.category){
        filterObj.category = req.params.category
    }
    let apifeatuers = new Apifeatures(subcategoryModel.find(filterobj), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
    let supcategories = await subcategoryModel.find({filterObj}).populate('category')
    res.json({message:"Success",page: apifeatuers.pageNumber,supcategories})
})

const gettSingleSupcategores = getone(subcategoryModel);


const updateSingleSupcategores = catchError(async(req,res,next)=>{
    if(req.body.name) req.body.slug = slugify(req.body.name)
    let subcategory = await subcategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !subcategory && res.status(404).json({message:"subCategory Not Found"})
    subcategory && res.json({message:"Success",subcategory})
})

const deleteSingleSupcategores = deleteOne(subcategoryModel)

export{
    addsubcategory,
    gettAllSupcategores,
    gettSingleSupcategores ,
    deleteSingleSupcategores,
    updateSingleSupcategores,  
}

