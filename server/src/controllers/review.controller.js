import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";


const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel.find({
      user: req.user.id
    }).sort("-createdAt");

    responseHandler.ok(res, reviews);
  } catch {
    responseHandler.error(res);
  }
};

export default { getReviewsOfUser };