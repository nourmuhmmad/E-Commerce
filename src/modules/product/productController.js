import { productModel } from "../../../database/models/productModel.js";
import { catchError } from "../../middleware/catchError.js";
import slugify from "slugify";
import { deleteOne } from "../../sharedFiles/handler.js";
import { Apifeatures } from "../../utils/APIFeatures.js";

const addproduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    if (req.files.imgcover) req.body.imgcover = req.files.imgcover[0].filename;
    if (req.files.images)
        req.body.images = req.files.images.map((img) => img.filename);
    let product = new productModel(req.body)
    console.log(product);
    await product.save()
    res.json({ message: "Add Successfly", product })
})

const gettAllproducts = catchError(async (req, res, next) => {
    let apifeatuers = new Apifeatures(productModel.find(), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let products = await apifeatuers.mongoosequery;
  res.json({ message: "products:", products });
});

const gettSingleproducts = catchError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id)
    !product && res.status(404).json({ message: "product Not Found" })
    product && res.json({ message: "Success", product })
})

const updateSingleproducts = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename
    if (req.files.images) req.body.images = req.files.images.map((img) => img.filename)
    let product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !product && res.status(404).json({ message: "product Not Found" })
    product && res.json({ message: "Success", product })
})

const deleteSingleproducts = deleteOne(productModel)


export {
    addproduct,
    gettAllproducts,
    gettSingleproducts,
    deleteSingleproducts,
    updateSingleproducts,
}

