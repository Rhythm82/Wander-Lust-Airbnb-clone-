import listSchema from "../joi_Schema/schema.js"
import ExError from "../utils/ExError.js";

const validateLists=(req, res, next)=>{
    const {error}=listSchema.validate(req.body)
    if (error) {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExError(400,errMsg);
    }else{
        next();
    }
}

export default validateLists