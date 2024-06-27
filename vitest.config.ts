import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
    alias: {
      'next/navigation': '/__mocks__/next/navigation.js',
      'next/font/google': '/__mocks__/next/font/google.js',
    },
  },
})