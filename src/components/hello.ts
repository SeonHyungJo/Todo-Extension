export const getValue: () => string = () => {
  return 'test';
};

export const getTestValue: (branch: boolean) => string = (branch: boolean) => {
  if (branch) {
    return 'TrueValue';
  }

  return 'FalseValue';
};
