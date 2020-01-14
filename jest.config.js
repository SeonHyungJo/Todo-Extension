const config = {
  rootDir: '.',
  preset: 'ts-jest',
  roots: ['<rootDir>/__tests__'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  moduleNameWrapper: {
    '@(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};

module.exports = config;
