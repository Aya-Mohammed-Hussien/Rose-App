export const createStripeSession = async (payload: any) => {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create Stripe session.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong while creating Stripe session.');
  }
};
