const ROOT_URL = "http://localhost:3035";
const PRODUCTS_URL = `${ROOT_URL}/products`;

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
    console.log("error", error);
    throw error;
  }
}

export function fetchProducts(body) {
  const url = `${PRODUCTS_URL}`;
  return POST(url, body);
}
