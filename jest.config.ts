import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageReporters: ['json'],
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
};

export default config;
