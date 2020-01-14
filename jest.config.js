const config = {
  rootDir: '.',
  preset: 'ts-jest',
  roots: ['<rootDir>/__tests__'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '@components/(.*)$': '<rootDir>/src/components/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,}', '!**/node_modules/**', '!**/dist/**'],
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
