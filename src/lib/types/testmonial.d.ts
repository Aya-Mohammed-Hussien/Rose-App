declare interface User {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
  email: string;
}

declare interface FeaturedTestimonials {
  _id: string;
  user: User;
  rating: number;
  content: string;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

declare interface TestimonialSuccessResponse {
  message: string;
  count: number;
  testmonials: FeaturedTestimonials[];
}

declare interface TestimonialErrorResponse {
  message: string;
}

type TestimonialsResponse = TestimonialSuccessResponse | TestimonialErrorResponse;
