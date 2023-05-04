module.exports = {
  verbose: false,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/__mocks__/styleMock.ts",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/src/__mocks__/fileMock.ts"
  }
};