const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

const config = {
  rootDir: '.',
  preset: 'ts-jest',
  roots: ['<rootDir>/__tests__'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
  // moduleNameMapper: {
  //   '@src/(.*)$': '<rootDir>/src/$1',
  //   '@components/(.*)$': '<rootDir>/src/components/$1',
  //   '@githubApi/(.*)$': '<rootDir>/src/github-api/$1',
  //   '@redux/(.*)$': '<rootDir>/src/redux/$1',
  //   '@model/(.*)$': '<rootDir>/src/model/$1',
  //   '@util/(.*)$': '<rootDir>/src/util/$1',
  // },
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
