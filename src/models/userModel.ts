import {Schema, model} from 'mongoose';
const userSchema = new Schema ({
    name: {type:String, require:true, unique:false},
    username: {type:String, require:true, unique:true},
    email: {type:String, require:true, unique:true},
    userType: {type:Number, require:true, unique:false},
    createdAt: {type:Date, require:true, unique:false},
    profilePhoto: {type:String, require:false, unique:false},
    isVerified: {type:Boolean, require:true, unique:false},

    
})