const ROOT_URL = "http://localhost:3035";

export async function POST(url, body) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

export function fetchProductsByName(productName) {
  const PRODUCTS_URL = `/products`;
  const url = `${ROOT_URL}${PRODUCTS_URL}`;
  const body = { name: productName };
  return POST(url, body);
}
