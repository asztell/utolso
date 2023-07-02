import * as React from "react";
import { render, act } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

function setup(keyValuePair: { key: string; initialValue: string | Function }) {
  const returnVal = {
    value: "",
    setValue: (value: string) => value,
  };
  function TestComponent() {
    const [value, setValue] = useLocalStorage(keyValuePair);
    Object.assign(returnVal, { value, setValue });

    return null;
  }
  render(<TestComponent />);
  return returnVal;
}

describe("useLocalStorage", () => {
  test("should return the initial value", () => {
    const key = "test";
    const initialValue = "testValue";
    //   const initialObjectValue = { test: "testValue" };
    const someObj = setup({ key, initialValue });
    expect(someObj.value).toBe(initialValue);
  });

  //   xtest("should return the initial value", () => {
  //     const key = "test";
  //     const initialValue = "testValue" as unknown as Function;
  //     //   const initialObjectValue = { test: "testValue" };
  //     const someObj = setup({ key, initialValue });
  //     expect(someObj.value).toBe(initialValue);
  //   });
});
