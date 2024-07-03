const Joi=require("joi");
module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        state:Joi.string().required(),
        BHK:Joi.number().required(),
        price:Joi.number().required(),
        image:Joi.array()
    }).required(),
});
module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()

    }).required(),
});