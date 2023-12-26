import { useEffect, useState } from "react";

// if application expands and multiple storages are present
// then to separate the local storages, use prefix
const prefix = "message-app-";

export default function useLocalStorage(key, initialVal) {
  const prefixKey = prefix + key;
  const [value, setValue] = useState(() => {
    // fetch the key value from storage
    const jsonValue = localStorage.getItem(prefixKey);
    // if value is not null i.e. any set value then return that value
    if (jsonValue != null) return JSON.parse(jsonValue);
    // if initialVal is a function invoke it and return
    // e.g. uuidv4()
    if (typeof initialVal === "function") return initialVal();
    // otherwise simply return the value
    else return initialVal;
  });

  useEffect(() => {
    localStorage.setItem(prefixKey, JSON.stringify(value));
  }, [prefixKey, value]);

  return [value, setValue];
}
