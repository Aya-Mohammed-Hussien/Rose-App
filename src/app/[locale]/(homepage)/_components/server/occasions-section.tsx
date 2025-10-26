import React from 'react';
import { getOccasions } from '@/lib/apis/occasions/occasion.api';
import { getProductsByOccasion } from '@/lib/apis/products/products-by-occasion.api';
import Occasions from '@/components/features/occasions/occasions'; // client component

// Props
// get occasions id from page params and send it here through props
type Props = { occasionId?: string | undefined };

export default async function OccasionsSection({ occasionId }: Props) {
  // Variable
  // occasions data
  const occasionsData = await getOccasions();
  const occasions = occasionsData?.occasions || [];

  // products data
  const selectedId = occasionId;
  const productsData = selectedId ? await getProductsByOccasion(selectedId) : { products: [] };

  return <Occasions occasions={occasions} products={productsData?.products || []} />;
}
