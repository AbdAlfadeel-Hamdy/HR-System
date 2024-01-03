import { Schema, model } from 'mongoose';
import { USER_ROLES } from '../utils/constants.js';
// Create the mongoose schema for the User model
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: Object.values(USER_ROLES),
    },
});
// Remove the password field from the JSON representation of the user
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
// Create and export the User model
export default model('User', userSchema);
