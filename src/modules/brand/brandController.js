import { catchError } from "../../middleware/catchError.js";
import slugify from "slugify";
import { deleteOne, getone } from "../../sharedFiles/handler.js";
import { Apifeatures } from "../../utils/APIFeatures.js";
import { brandModel } from "../../../database/models/brandModel.js";

const addbrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let brands = new brandModel(req.body)
    console.log(brands);
    await brands.save()
    res.json({ message: "Success", brands })
})

const gettAllBrands = catchError(async (req, res, next) => {
    let apifeatuers = new Apifeatures(brandModel.find(), req.query)
    .fields()
    .search()
    .sort()
    .filter()
    .pagination();
  let brands = await apifeatuers.mongoosequery;
  res.json({ message: "brands:", brands });
})

const gettSingleBrands = getone(brandModel)

const deleteSingleBrands =deleteOne(brandModel)

const updateSingleBrands = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.image = req.file.filename
    let brands = await brandModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !brands && res.status(404).json({ message: "brands Not Found" })
    brands && res.json({ message: "Success", brands })
})

export {
    addbrand,
    gettAllBrands,
    gettSingleBrands,
    deleteSingleBrands,
    updateSingleBrands,
}

