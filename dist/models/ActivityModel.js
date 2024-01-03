import { Schema, model } from "mongoose";
const activitySchema = new Schema({
    userName: String,
    activity: String,
    timeStamp: Date,
});
export default model("Activity", activitySchema);
