import { UnauthenticatedError, UnauthorizedError, } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";
export const authenticateUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        throw new UnauthenticatedError("Authentication failed.");
    try {
        const { id, role, name } = verifyJWT(token);
        req.user = { id, role, name };
        next();
    }
    catch (err) {
        throw new UnauthenticatedError("Authentication failed.");
    }
};
export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            throw new UnauthorizedError("Unauthorized to access this route.");
        next();
    };
};
