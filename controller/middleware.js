const middleWareJWT = (req, res, next) => {
  const token = req.headers.authorization;
  const user = jwt.decode(token, process.env.secret_token_jwt);
  if (!user || !token) {
    return res.status(401).json({ message: "Harap Register atau login dulu" });
  }
  req.payloadUser = user;

  next();
};

module.exports = {
  middleWareJWT,
};
