import { Schema, model, Document } from 'mongoose';
import { USER_ROLES } from '../utils/constants.js';

// Define the interface for the User document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

// Create the mongoose schema for the User model
const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
  },
});

// Remove the password field from the JSON representation of the user
userSchema.methods.toJSON = function (this: IUser) {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Create and export the User model
export default model<IUser>('User', userSchema);
