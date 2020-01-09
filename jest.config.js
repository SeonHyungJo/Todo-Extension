const config = {
  jest: {
    roots: ['<rootDir>/test'],
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testPathIgnorePatterns: ['<rootDir>/node_modules'],
  },
};

module.exports = config;
