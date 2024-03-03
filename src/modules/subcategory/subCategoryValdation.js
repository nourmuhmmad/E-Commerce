import Joi from "joi";

const addSupatgoryVal = Joi.object({
    name : Joi.string().min(2).max(300).required().trim(),
    category : Joi.string().hex().length(24).required()

}) 

const updateSupcategoryVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(2).max(100).trim(),
    category : Joi.string().hex().length(24),
    image : Joi.object({
        fieldname : Joi.string().required(),
        originalname : Joi.string().required(),
        encoding : Joi.string().required(),
        mimetype : Joi.string().valid('image/jpeg','image/png'),
        size : Joi.number().max(5242880).required(),
        destination : Joi.string().required(),
        fieldname : Joi.string().required(),
        path : Joi.string().required(),
    })

})

export {
    addSupatgoryVal,
    updateSupcategoryVal
}