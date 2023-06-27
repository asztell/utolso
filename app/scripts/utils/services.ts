import { Product } from "../reducers/products";

// ROOT_URL would be moved to a config file
export const ROOT_URL = "http://localhost:3035";

// fetchConfig would be moved to a config file for api calls
// alternatively it could be moved to a common service library
// (if this is part of a medium/large project with authentication, etc.)
// (ideally this would be a library that is shared across projects: ui and backend)
type FetchConfig = {
  method: string;
  headers: {
    Accept: string;
    "Content-Type": string;
  };
};

export const fetchConfig: FetchConfig = {
  method: "POST",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
};

type Body = {
  name: string;
};

export async function POST(url: string, body: Body) {
  try {
    const response = await fetch(url, {
      ...fetchConfig,
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (error) {
    throw error as Error;
  }
}

// PRODUCTS_URL would be moved to a constants file
export const PRODUCTS_URL = `/products`;

export function fetchProductsByName(productName: string): Promise<Product[]> {
  const url = `${ROOT_URL}${PRODUCTS_URL}`;
  const body = { name: productName };
  return POST(url, body);
}
