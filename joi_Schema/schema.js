import Joi from "joi";

const listSchema = Joi.object({
  regDetails: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    image: Joi.string().allow("", null),
    price: Joi.number().required().min(1),
    location: Joi.string().required(),
    country: Joi.string().required(),
    amenities: Joi.array().items(Joi.string()).allow(null, ""),
    category: Joi.string()
      .valid(
        "Beach",
        "Mountain",
        "Pool",
        "Camping",
        "Rooms",
        "Trending",
        "Amazing Views",
        "Amazing Cities",
        "Forest",
        "Caravan",
        "Arctic",
        "Castles"
      )
      .required(),
  }).required(),
});

export default listSchema;
