// ROOT_URL would be moved to a config file
export const ROOT_URL = "http://localhost:3035";

// fetchConfig would be moved to a config file for api calls
// alternatively it could be moved to a common service library
// (if this is part of a medium/large project with authentication, etc.)
// (ideally this would be a library that is shared across projects: ui and backend)
export const fetchConfig = {
  method: "POST",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
};

export async function POST(url, body) {
  try {
    console.log("POST" + url + " " + JSON.stringify(body));
    const response = await fetch(url, {
      ...fetchConfig,
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

// PRODUCTS_URL would be moved to a constants file
export const PRODUCTS_URL = `/products`;

export function fetchProductsByName(productName) {
  const url = `${ROOT_URL}${PRODUCTS_URL}`;
  const body = { name: productName };
  return POST(url, body);
}
