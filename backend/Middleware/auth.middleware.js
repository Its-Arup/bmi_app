const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../Model/blacklist.model");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (token) {
      const alreadyLogout = await BlacklistModel.find({ blacklist : token });

      if (alreadyLogout.length > 0) {
        return res.send({ msg: "please login again!" });
      }

      const decoded = jwt.verify(token, "masai");
      req.body.userID = decoded.userID;
      req.body.username = decoded.username;
      next();
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports = {
  auth,
};
