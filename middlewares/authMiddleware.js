const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  // Assuming you have the token in the request headers or body
  const token = req.headers.authorization || req.body.token;
  console.log(token)

  // Verify and decode the token
  jwt.verify(token, 'shantanu', (error, decoded) => {
    if (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Extract the user ID from the decoded payload
    const user_id = decoded.user_id;

    // Set the user ID in the request object
    req.user_id = user_id;

    // Continue to the next middleware or controller method
    next();
  });
};

module.exports = authMiddleware;
