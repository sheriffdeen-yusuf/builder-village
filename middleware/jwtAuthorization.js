import jwt from "jsonwebtoken";
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  const userDetails = { name: "tester1", psw: "xxxx" };
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    // req.bearerToken = bearerToken;
    jwt.verify(
      bearerToken,
      "secretkey",

      (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = userDetails;
      }
    );
    next();
  } else {
    res.sendStatus(401);
  }
}

export { verifyToken };
