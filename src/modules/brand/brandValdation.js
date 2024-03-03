import Joi from "joi";

const addBrandVal = Joi.object({
    name : Joi.string().min(2).max(300).required().trim(),
    logo : Joi.object({
        fieldname : Joi.string().required(),
        originalname : Joi.string().required(),
        encoding : Joi.string().required(),
        mimetype : Joi.string().valid('image/jpeg','image/png'),
        size : Joi.number().max(5242880).required(),
        destination : Joi.string().required(),
        fieldname : Joi.string().required(),
        path : Joi.string().required(),
    }).required()
}) 

const updateBrandVal = Joi.object({
    name: Joi.string().min(2).max(100).trim(),
    id : Joi.string().hex().length(24),
    logo : Joi.object({
        fieldname : Joi.string(),
        originalname : Joi.string(),
        encoding : Joi.string(),
        mimetype: Joi.string().valid("image/jpeg", "image/png", "image.jpg").required(),        size : Joi.number().max(5242880).required(),
        destination : Joi.string(),
        fieldname : Joi.string(),
        path : Joi.string(),
    })
})

export {
    addBrandVal,
    updateBrandVal
}