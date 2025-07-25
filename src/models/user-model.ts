import {Schema, model} from 'mongoose';
const userSchema = new Schema({
  name:         { type: String, required: true },
  username:     { type: String, required: true, unique: true },
  email:        { type: String, required: true, unique: true },
  userType:     { type: Number, required: true },
  profilePhoto: { type: String },
  isVerified:   { type: Boolean, required: true },
  password:     { type: String, required: true },
}, { timestamps: true }); 
const UserModel = model('User',userSchema);

export default UserModel;
