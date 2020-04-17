module.exports = {
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1',
    'test/(.*)$': '<rootDir>/test/$1',
  },
  resetMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/test/setup-tests.js'],
  testMatch: ['**/test/**/*-test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/test/support/', '.cache', '/.next/'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
}
