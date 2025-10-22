export async function getProducts(searchParams: Record<string, any>) {
  const params = new URLSearchParams();

  const page = searchParams.page || 1;
  const limit = searchParams.limit || 12;
  params.append('page', String(page));
  params.append('limit', String(limit));

  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
    else params.append(key, value);
  });

  const url = `${process.env.NEXT_PUBLIC_API}/products?${params.toString()}`;
  console.log('Fetching:', url);

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
