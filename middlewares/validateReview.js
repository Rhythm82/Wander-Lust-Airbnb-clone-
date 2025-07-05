import reviewSchema from "../joi_Schema/review.js";
import ExError from "../utils/ExError.js";

const validateReview=(req, res, next)=>{
    const {error}=reviewSchema.validate(req.body)
    if (error) {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExError(400,errMsg);
    }else{
        next();
    }
}
export default validateReview;