
import { Document, Schema } from 'mongoose';

export const OfferSchema = new Schema({
  title: { type: String },
  description: { type: String, },
  datePublished: { type: Date },
  userId: { type: String },
  filePath: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: { type: Array<String>(), default: [] },
  dislikedBy: { type: Array<String>(), default: [] },
  image:
  {
    data: Buffer,
    contentType: String
  }
}, { timestamps: true });

export interface Offer extends Document {
  _id: string;
  title: string;
  description: string;
  datePublished: number;
  userId: string;
  filePath: string;
  image: File;
  likes: number;
  dislikes: number;
  likedBy: string[];
  dislikedBy: string[];
}
