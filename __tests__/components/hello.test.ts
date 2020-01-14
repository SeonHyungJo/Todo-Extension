import { getValue, getTestValue } from '@components/hello';

test('getValue Testing', () => {
  const expectValue: string = 'test';
  const resultValue: string = getValue();

  expect(expectValue).toBe(resultValue);
});

test('getTestValue Testing', () => {
  const expectTrueValue: string = 'TrueValue';
  const expectFalseValue: string = 'FalseValue';

  const resultTrueValue: string = getTestValue(true);
  const resultFalseValue: string = getTestValue(false);

  expect(expectTrueValue).toBe(resultTrueValue);
  expect(expectFalseValue).toBe(resultFalseValue);
});
