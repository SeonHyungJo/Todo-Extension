export function encode(value: string): string {
  return window.btoa(encodeURIComponent(value));
}

export function decode(encoded: string): string {
  return decodeURIComponent(window.atob(encoded));
}

export function getItem(key: string): Object {
  const plainData = window.localStorage.getItem(key);

  if (!plainData) {
    return '';
  }

  const decodedData = decode(plainData);
  const result = JSON.parse(decodedData);

  return result;
}

export function setItem(key: string, value: string): void {
  if (!window.localStorage) {
    return;
  }

  const stringifyData = JSON.stringify(value);
  const encodedData = encode(stringifyData);

  return window.localStorage.setItem(key, encodedData);
}

export function getState(key: string): Object {
  const plainData = getItem(key);

  return plainData;
}

export function setState(key: string, value: string): void {
  return setItem(key, value);
}
