const config = {
  jest: {
    roots: ['<rootDir>/__test__'],
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
    moduleFileExtensions: ['ts', 'js'],
  },
};

module.exports = config;
