export async function getFeaturedTestimonials(): Promise<TestimonialsResponse> {
  try {
    const response = await fetch(
      `${process.env.API}/api/v1/testimonials/featured?limit=6`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const payload: TestimonialsResponse = await response.json();
    if (!response.ok) {
      console.log("Error while fetching testimonails:", payload.message);
      return payload as TestimonialErrorResponse;
    }
    console.log("Featured Testimonails", payload);
    return payload as TestimonialSuccessResponse;
  } catch (error) {
    console.log("Error while getting featured testmonials", error);
    throw error;
  }
}
