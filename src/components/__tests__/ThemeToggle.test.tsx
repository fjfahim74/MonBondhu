import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '@/components/ThemeToggle';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
});

test('toggles dark class on html element', async () => {
  render(<ThemeToggle />);
  const btn = await screen.findByRole('button', { name: /toggle theme/i });

  const user = userEvent.setup();
  expect(document.documentElement.classList.contains('dark')).toBe(false);
  await user.click(btn);
  expect(document.documentElement.classList.contains('dark')).toBe(true);
  await user.click(btn);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
});
