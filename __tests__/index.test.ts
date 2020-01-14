import { indexFunction } from '@src/index';

test('indexFunction Testing', () => {
  const expectValue: string = 'index';
  const resultValue: string = indexFunction();

  expect(expectValue).toBe(resultValue);
});
