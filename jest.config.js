module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular'
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  moduleFileExtensions: ['ts', 'html', 'js'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  coverageDirectory: 'coverage',
};
