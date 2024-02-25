export default {
  preset: "ts-jest",
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.ts",
    "\\.(css)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
