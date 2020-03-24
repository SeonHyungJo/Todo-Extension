function encode(value: string) {
  return window.btoa(encodeURIComponent(value));
}

function decode(encoded: string) {
  return decodeURIComponent(window.atob(encoded));
}

function getDataFromLocalStorage(data: string): object {
  return JSON.parse(data);
}

function setDataToLocalStorage(key: string, data: string): void {
  return window.localStorage.setItem(key, data);
}

/**
 * @param key : localStorge에 저장된 값에 대한 key
 * @param defaultValue : localStroge에 해당 key에 대한 값이 없을 때 반환할 value
 * @param isEncoded : 암호화 여부
 */
export function getItem(
  key: string,
  defaultValue: any,
  isEncoded: boolean = false,
): object {
  const plainData = window.localStorage.getItem(key);

  if (!plainData) {
    return {
      [key]: defaultValue,
    };
  }

  if (isEncoded) {
    const decodedData = decode(plainData);
    return getDataFromLocalStorage(decodedData);
  }

  return getDataFromLocalStorage(plainData);
}

/**
 * @param key : localStorge에 저장할 값에 대한 key
 * @param defaultValue : localStroge에 저장 할 해당 key에 대한 value
 * @param isEncoded : 암호화 여부
 */
export function setItem(
  key: string,
  value: any,
  isEncoded: boolean = false,
): void {
  const stringifyData = JSON.stringify(value);

  if (isEncoded) {
    const encodedData = encode(stringifyData);
    return setDataToLocalStorage(key, encodedData);
  }

  return setDataToLocalStorage(key, stringifyData);
}

export function deleteItem(key: string): void {
  if (!key) {
    console.error('key is not defined');
    return;
  }

  return localStorage.removeItem(key);
}
