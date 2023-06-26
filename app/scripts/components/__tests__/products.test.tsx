import React from "react";
import { render } from "@testing-library/react";

import { Products } from "../products";

describe("<Products />", () => {
  test("render Products", () => {
    const { container } = render(<Products />);
    expect(container).toMatchSnapshot();
  });
});
