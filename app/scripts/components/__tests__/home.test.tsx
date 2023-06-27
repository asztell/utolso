import React from "react";
import { render } from "@testing-library/react";

import { Home } from "../home";

describe("<Home />", () => {
  test("render Home", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
