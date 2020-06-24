module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: [
    'src/components/**/*.vue',
    'src/utils/**/*.ts',
    '!src/utils/axios.ts'
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/unit/coverage'
}
