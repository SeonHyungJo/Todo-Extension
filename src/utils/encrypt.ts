export const encode = (value: string): string =>
  window.btoa(window.encodeURIComponent(value));

export const decode = (encoded: string): string =>
  window.decodeURIComponent(window.atob(encoded));
