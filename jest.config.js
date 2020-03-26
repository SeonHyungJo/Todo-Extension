const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

const config = {
  rootDir: '.',
  preset: 'ts-jest',
  roots: ['<rootDir>/__tests__'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$',
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['**/*.{ts,}', '!**/node_modules/**', '!**/dist/**'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
    'window': {}
  },
  testMatch: null,
};

module.exports = config;
