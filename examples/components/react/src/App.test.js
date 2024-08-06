import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders hello react text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, react/i);
  expect(linkElement).toBeInTheDocument();
});

test('button resets slider value', () => {
  render(<App />);
  const button = screen.queryByText(/Reset/);
  fireEvent.click(button);
  expect(screen.queryByText(/50/)).toBeNull();
});
