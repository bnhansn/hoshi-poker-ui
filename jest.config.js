/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/jest.setup.js'
  ],
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true,
  restoreMocks: true,
  modulePathIgnorePatterns: ['<rootDir>/e2e']
}

module.exports = createJestConfig(customJestConfig)
