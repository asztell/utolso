import { useState, useEffect } from "react";

function getSavedValue(key: string, initialValue: string | Function) {
  const localStorageValue = window.localStorage.getItem(key);
  // const localStorageValue = localStorage.getItem(key);
  if (localStorageValue) {
    // console.log("localStorageValue", localStorageValue);
    return JSON.parse(localStorageValue);
  }
  if (initialValue instanceof Function) {
    // console.log("initialValue", initialValue());
    return initialValue();
  }
  // console.log("initialValue", initialValue);
  return initialValue;
}

export function useLocalStorage({
  key,
  initialValue,
}: {
  key: string;
  initialValue: string | Function;
}) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
    // localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
