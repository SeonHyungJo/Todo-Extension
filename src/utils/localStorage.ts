import { encode, decode } from '@/utils/encrypt';

export const getItem = (
  key: string,
  defaultValue: any,
  isEncoded: boolean = false,
) => {
  const plainData = window.localStorage.getItem(key);

  if (!plainData) return defaultValue;

  const decodedData = isEncoded ? decode(plainData) : plainData;

  return JSON.parse(decodedData);
};

export const setItem = (
  key: string,
  value: any,
  isEncoded: boolean = false,
): void => {
  const stringifyData = isEncoded
    ? encode(JSON.stringify(value))
    : JSON.stringify(value);

  window.localStorage.setItem(key, stringifyData);
};

export const deleteItem = (key: string): void => {
  if (!key) {
    console.error('key is not defined');
  } else {
    localStorage.removeItem(key);
  }
};
