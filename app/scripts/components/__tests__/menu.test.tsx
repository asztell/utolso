import React from "react";
import { IntlProvider } from "react-intl";
import { render } from "@testing-library/react";

import { Menu } from "../menu";

describe("<Menu />", () => {
  test("render Menu", () => {
    const { container } = render(
      // the IntlProvider would be extracted into a helper function
      // that would be used by all the tests
      <IntlProvider
        locale={navigator.language}
        messages={{
          // in a medium/large app the messages would be composed with a helper function
          // that would read the messages from a file
          // and merge them with the default text
          "Nav.NavItem.Sale": "test SALE UPON SALE",
          "Nav.NavItem.Holiday": "test HOLIDAY",
          "Nav.NavItem.New": "test NEW",
          "Nav.NavItem.Products": "test PRODUCTS",
          "Nav.NavItem.Best-Sellers": "test BEST-SELLERS",
          "Nav.NavItem.Goodbyes": "test GOODBYES",
          "Nav.NavItem.Inspiration": "test INSPIRATION",
          "PromoStrip.Promo.Text":
            "test COOL ADVERTISING WITH PROMOTIONS AND SALES!",
          "PromoStrip.URL.Text": "test SIGN UP",
          "SearchInput.Placeholder": "test SEARCH",
          "SearchResultsSummary.Displayed":
            "test DISPLAYING {displayed} OF {total} RESULTS",
          "SearchResultsSummary.Total": "test SEE ALL RESULTS",
        }}
      >
        <Menu />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
