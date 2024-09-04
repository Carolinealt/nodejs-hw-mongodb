import joi from 'joi';

export const contactSchema = joi.object({
    name: joi.string().min(3).max(20).required().messages({
        "string.base": "Name should been a string"
    }),
    phoneNumber: joi.string().required(),
    email: joi.string(),
    isFavourite: joi.boolean(),
    contactType: joi.valid("personal", "home", "work").required()
})

export const contactPatchSchema = joi.object({
    name: joi.string().min(3).max(20).messages({
        "string.base": "Name should been a string"
    }),
    phoneNumber: joi.string(),
    email: joi.string(),
    isFavourite: joi.boolean(),
    contactType: joi.valid("personal", "home", "work")
})

