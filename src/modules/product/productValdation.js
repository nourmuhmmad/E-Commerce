import Joi from "joi";

const addproductVal = Joi.object({
    title : Joi.string().min(2).max(300).required().trim(),
    description : Joi.string().min(2).max(1500).required().trim(),
    price : Joi.number().min(0).required(),
    priceAfterDiscount : Joi.number().min(0).optional(),
    quantity : Joi.number().min(0).optional(),
    brandId: Joi.string().hex().length(24).required(),
    createdBy: Joi.string().hex().length(24).optional(),
    categoryId: Joi.string().hex().length(24).required(),
    subcategoryId: Joi.string().hex().length(24).required(),
    imgCover : Joi.array().items(Joi.object({
        fieldname : Joi.string().required(),
        originalname : Joi.string().required(),
        encoding : Joi.string().required(),
        mimetype : Joi.string().valid('image/jpeg','image/png'),
        size : Joi.number().max(5242880).required(),
        destination : Joi.string().required(),
        fieldname : Joi.string().required(),
        path : Joi.string().required(),
    })),
    images : Joi.array().items(Joi.object({
        fieldname : Joi.string().required(),
        originalname : Joi.string().required(),
        encoding : Joi.string().required(),
        mimetype : Joi.string().valid('image/jpeg','image/png'),
        size : Joi.number().max(5242880).required(),
        destination : Joi.string().required(),
        fieldname : Joi.string().required(),
        path : Joi.string().required(),
    }))
}) 

const updateproductVal = Joi.object({
    id : Joi.string().hex().length(24).required(),
    title : Joi.string().min(2).max(300).optional().trim(),
    description : Joi.string().min(2).max(300).optional().trim(),
    price : Joi.number().min(0).optional(),
    priceAfterDiscount : Joi.number().min(0).optional(),
    quantity : Joi.number().min(0).optional(),
    brandId: Joi.string().hex().length(24).optional(),
    createdBy: Joi.string().hex().length(24).optional(),
    categoryId: Joi.string().hex().length(24).optional(),
    subcategoryId: Joi.string().hex().length(24).optional(),
    imgCover : Joi.array().items(Joi.object({
        fieldname : Joi.string().required(),
        originalname : Joi.string().required(),
        encoding : Joi.string().required(),
        mimetype : Joi.string().valid('image/jpeg','image/png'),
        size : Joi.number().max(5242880).required(),
        destination : Joi.string().required(),
        fieldname : Joi.string().required(),
        path : Joi.string().required(),
    })),
    images : Joi.array().items(Joi.object({
        fieldname : Joi.string().required(),
        originalname : Joi.string().required(),
        encoding : Joi.string().required(),
        mimetype : Joi.string().valid('image/jpeg','image/png'),
        size : Joi.number().max(5242880).required(),
        destination : Joi.string().required(),
        fieldname : Joi.string().required(),
        path : Joi.string().required(),
    }))
})

export {
    addproductVal,
    updateproductVal
}