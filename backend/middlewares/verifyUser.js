const jwt = require('jsonwebtoken');

 const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // requesting token fron the cookies
  console.log(req.cookies); 

  if (!token) return next(errorHandler(401, 'Unauthorized')); // user is not authorized 

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(401, 'Unauthorized') // user is not authorized

    req.user = user; 
    next();// sending user to next functionality 
  });
};

module.exports = verifyToken;