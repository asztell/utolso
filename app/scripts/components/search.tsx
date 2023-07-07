import React, { useMemo } from "react";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { fetchProductsByName } from "../utils/services";
import { useProducts } from "../contexts/products";
import { Product } from "../reducers/products";
import { useLocalStorage } from "../hooks/useLocalStorage";
import debounce from "lodash.debounce";

export function Search() {
  const { formatMessage } = useIntl();
  const { updateProducts } = useProducts();
  const [search, setSearch] = useLocalStorage({
    key: "search",
    initialValue: "",
  });
  const [products, setProducts] = useLocalStorage({
    key: "products",
    initialValue: () => [],
  });

  const onSearch = useCallback(
    // If I had more time I would do the following:
    // ✓ 1. normally I would use debounce to avoid making too many requests
    // 2. I would also use a loading state to show
    //    - a spinner while the request is being made
    //    - or a template ui while the request is being made
    // 3. and a state to show an error message if the request fails
    // 4. I would also add a limit to the number of requests that can be made in a certain amount of time
    //    to avoid hitting the API rate limit
    // 5. I might also add a limit to the number of characters that can be searched
    //    to avoid making requests that will return no results
    // 6. I might also remove this function from this component and move it to a utils file
    //    to make it easier to test and reuse if necessary
    async ({
      target: { value },
    }: {
      target: { value: string };
    }): Promise<void> => {
      setSearch(value);
      console.log("localStorage.search", localStorage.search);
      try {
        const response: Product[] = await fetchProductsByName(value);
        // console.log("response", response);
        setProducts(JSON.stringify(response));
        console.log("localStorage.products", localStorage.products);
        updateProducts(response);
      } catch (error) {
        // normally I would use a logger like Sentry to log the error
        console.warn("There was an error", error);
      }
    },
    [updateProducts]
  );

  const debouncedOnSearch: React.ChangeEventHandler<HTMLInputElement> = useMemo(
    () => debounce(onSearch, 300),
    []
  );

  const placeholder: string = useMemo(
    () => formatMessage({ id: "SearchInput.Placeholder" }),
    [formatMessage]
  );

  return (
    <>
      <div className="Search box">
        <input
          type="text"
          onChange={debouncedOnSearch}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}
