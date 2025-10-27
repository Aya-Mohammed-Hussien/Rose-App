export interface ReviewProduct {
  _id: string;
  title: string;
  imgCover: string;
  id: string;
}

export interface ReviewUser {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
}

export interface AddReview {
  _id: string;
  product: ReviewProduct;
  user: ReviewUser;
  rating: number;
  title: string;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AddReviewResponse {
  message: string;
  review: AddReview;
}

export type ReviewData = {
  product: string;
  rating: number;
  title: string;
  comment: string;
};
