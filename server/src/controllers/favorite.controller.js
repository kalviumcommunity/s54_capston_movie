import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";




const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModel.find({ user: req.user.id }).sort("-createdAt");

    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

export default {  getFavoritesOfUser };