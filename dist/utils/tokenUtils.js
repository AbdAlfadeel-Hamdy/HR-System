import jwt from 'jsonwebtoken';
export const createJWT = async (payload) => {
    if (!process.env.JWT_SECRET)
        return;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};
export const verifyJWT = (token) => {
    if (!process.env.JWT_SECRET)
        return;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
};
