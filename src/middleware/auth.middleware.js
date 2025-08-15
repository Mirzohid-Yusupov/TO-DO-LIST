const response = require("../utils/response.helper");
const jwt = require("../utils/jwt.helper");

const auth = async (req, res, next) => {
  try {
    // Skip authentication for public routes (like /auth/verify)
    if (req.path.includes("/auth")) return next();

    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return response.warning(res, "Authorization token missing");
    }

    const decoded = await jwt.verifyAccessToken(token);
    if (!decoded) {
      return response.forbidden(res, "Invalid or expired token");
    }

    req.user = decoded;
    return next();
  } catch (error) {
    console.error("Authentication error:", error);
    return response.error(res, 500, "Internal server error");
  }
};

module.exports = auth;
