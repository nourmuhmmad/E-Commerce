import joi from "joi";
const addwhishlistval = joi.object({
  product: joi.string().hex().length(24).required(),
});

const updatewhishlistVal = joi.object({
  product: joi.string().hex().length(24),
});
export { addwhishlistval, updatewhishlistVal };
