export const useRouter = () => ({
  push: vi.fn(),
  prefetch: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
  },
});