import React from "react";
import { IntlProvider } from "react-intl";
import { render, screen, fireEvent } from "@testing-library/react";

import { Search } from "../search";

describe("<Search />", () => {
  test("render Search", () => {
    render(
      <IntlProvider
        locale={navigator.language}
        messages={{
          "SearchInput.Placeholder": "test SEARCH",
        }}
      >
        <Search />
      </IntlProvider>
    );
    // the search fails because the useReducer needs to be mocked
    fireEvent.change(screen.getByPlaceholderText("test SEARCH"), {
      target: { value: "test" },
    });
    expect(screen.getByPlaceholderText("test SEARCH")).toHaveValue("test");
  });
});
