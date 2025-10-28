export async function getProducts(searchParams: Record<string, any>) {
  const params = new URLSearchParams();
  const page = searchParams.page ?? 1;
  const limit = searchParams.limit ?? 12;
  params.set('page', String(page));
  params.set('limit', String(limit));

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === 'page' || key === 'limit') return;
    if (value === undefined || value === null || value === '') return;

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.append(key, String(value));
    }
  });

  const url = `${process.env.NEXT_PUBLIC_API}/products?${params.toString()}`;
  console.log('Fetching:', url);

  try {
    const res = await fetch(url, { cache: 'no-store' }); // عدل لو عايز caching
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('getProducts error:', error);
    throw error;
  }
}
