module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/*spec.ts'],
  testResultsProcessor: 'jest-sonar-reporter',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports',
        outputName: 'jest-results.xml',
      },
    ],
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'text-summary', 'cobertura'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/test/'],
  setupFiles: ['./test/setup.js'],
};
