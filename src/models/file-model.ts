import {Schema, model} from 'mongoose';
import { Visibility } from '../utils/enums';

const fileSchema = new Schema({
  originalName:  { type: String, required: true },
  storedName:    { type: String, required: true, unique: true },
  type:          { type: String, required: true },
  size:          { type: Number, required: true },
  owner:         { type: Schema.Types.ObjectId, ref: 'User', required: true },
  visibility:    { type: String, enum: Object.values(Visibility), required: true },
  storagePath:   { type: String, required: true },
  tags:          { type: [String], default: [] },
}, { timestamps: { createdAt: 'uploadedAt', updatedAt: false } });


const FileModel = model('File',fileSchema)

export default FileModel;
