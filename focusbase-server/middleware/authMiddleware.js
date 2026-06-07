
const jwt = require('jsonwebtoken');

const protectMiddleware = async (req, res, next) => {
    let token;

    // 1. Check if the Authorization header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Extract the token string (split by space: ["Bearer", "TOKEN_STRING"])
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify the token using your environment secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Attach the decoded payload (user ID) to the request object
            // This is how our controllers will know who owns the task!
            req.user = { id: decoded.userId};

            // 5. Pass control to the next function (the controller)
            next();
        } catch (error) {
            // If token verification fails (expired or tampered with)
            return res.status(401).json({ 
                success: false, 
                message: 'Not authorized, token failed' 
            });
        }
    }

    // If no token was found in the headers at all
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not authorized, no token provided' 
        }); // Expected: 401 Unauthorized 
    }
};

module.exports = { protectMiddleware };



