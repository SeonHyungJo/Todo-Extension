export const encode = (value: string): string => {
  if (!window.btoa || !window.encodeURIComponent) return '';

  return window.btoa(window.encodeURIComponent(value));
};

export const decode = (encoded: string): string => {
  if (!window.atob || !window.decodeURIComponent) return '';

  return window.decodeURIComponent(window.atob(encoded));
};
