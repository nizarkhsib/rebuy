
export interface Offer {
  _id?: string;
  title?: string;
  description?: string;
  content?: string;
  datePublished?: number;
  userId?: string;
  filePath?: string;
  likedBy?: string[];
  dislikedBy?: string[];
  likes?: number;
  dislikes?: number;
}
