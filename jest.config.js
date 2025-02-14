module.exports = {
    preset: 'ts-jest', // Ensures Jest uses ts-jest
    testEnvironment: 'node', // Required for testing Node.js apps
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Ensure ts-jest handles TypeScript files
    },
    testMatch: [
      '**/test/**/*.test.ts', // Match test files in the test directory
    ],
    globals: {
      'ts-jest': {
        isolatedModules: true, // Speed up testing by avoiding full type checking
      },
    },
  };
  