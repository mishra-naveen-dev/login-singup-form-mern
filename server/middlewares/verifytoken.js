const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).send({ message: "You are not unauthorized!" });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, data) => {
    if (err) {
      return res.status(401).send({ message: "You are not unauthorized!" });
    }

    req._id = data._id;
    next();
  });
};
