import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
email: {
    type: String,
    required: true,
    unique: true,
}, 
userName:{
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9]+$/, 'user name is invalid, please include letters a-z or A-Z '],
},
image:{
    type: String,
}
});

const User = models.User || model('User', userSchema); // if the model exists, use it, if not, create a new model. this prevents the model being recompiled when the server restarts and prevents the error: "Cannot overwrite `User` model once compiled." its more efficient

export default User;