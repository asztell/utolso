import React from "react";
import { IntlProvider } from "react-intl";
import { render, screen, fireEvent } from "@testing-library/react";

import { Search } from "../search";

describe("<Search />", () => {
  test("render Search", () => {
    const { container } = render(
      <IntlProvider
        locale={navigator.language}
        messages={{
          "SearchInput.Placeholder": "test SEARCH",
        }}
      >
        <Search />
      </IntlProvider>
    );
    fireEvent.change(screen.getByPlaceholderText("test SEARCH"), {
      target: { value: "test" },
    });
    expect(screen.getByPlaceholderText("test SEARCH")).toHaveValue("test");
    // expect(container).toMatchSnapshot();
  });
});
