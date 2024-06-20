import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    // environment: 'jsdom',
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      all: true,
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/**/*.test.{js,jsx,ts,tsx}'],
    },
  },
})