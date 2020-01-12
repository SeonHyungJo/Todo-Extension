const config = {
  rootDir: '.',
  preset: 'ts-jest',
  roots: ['<rootDir>/__tests__'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  collectCoverage: true,
  colors: true,
};

module.exports = config;
