import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

const createEmptyNextUrl = () => ({
  href: '/',
  origin: 'http://localhost',
  protocol: 'http:',
  host: 'localhost',
  hostname: 'localhost',
  port: '',
  pathname: '/',
  search: '',
  hash: '',
  username: '',
  password: '',
  searchParams: new URLSearchParams(),
});

class NextRequestStub extends Request {
  nextUrl = createEmptyNextUrl();
}

if (
  typeof window.Request !== 'undefined' &&
  !(
    window.Request as typeof Request & {
      __isNextStub?: boolean;
    }
  ).__isNextStub
) {
  (window.Request as typeof Request & { __isNextStub?: boolean }).__isNextStub = true;
  window.Request = NextRequestStub;
}

type NextNavigation = {
  useRouter: () => {
    push: ReturnType<typeof vi.fn>;
    replace: ReturnType<typeof vi.fn>;
    prefetch: ReturnType<typeof vi.fn>;
    back: ReturnType<typeof vi.fn>;
    refresh: ReturnType<typeof vi.fn>;
    forward: ReturnType<typeof vi.fn>;
  };
  usePathname: () => string;
  useSearchParams: () => URLSearchParams;
};

vi.mock(
  'next/navigation',
  (): NextNavigation => ({
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      refresh: vi.fn(),
      forward: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  }),
);

vi.mock('next/link', async () => {
  const React = await import('react');

  return {
    default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

beforeAll(() => {
  if (!global.ResizeObserver) {
    global.ResizeObserver = class {
      observe() {}
      disconnect() {}
      unobserve() {}
    };
  }
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
});
