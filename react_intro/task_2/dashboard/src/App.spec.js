import { render, screen } from '@testing-library/react';
import App from './App';

test('renders School Dashboard h1', () => {
    render(<App />);
    const h1 = screen.getByText(/school dashboard/i);
    expect(h1).toBeInTheDocument();
});

test('renders correct text content p elements app-body and app-footer', () => {
    render(<App />);
    const Body_p = screen.getByText('Login to access the full dashboard');
    expect(Body_p).toBeInTheDocument();
    const Footer_p = screen.getByText(/Copyright 2026|holberton School/i);
    expect(Footer_p).toBeInTheDocument();
});

test('renders img is element', () => {
    render(<App />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
});

test('renders 2 input elements', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
});

test('renders 2 label elements', () => {
    render(<App />);
    const emailLabel = screen.getByText(/email/i);
    expect(emailLabel).toBeInTheDocument();
    const passwordLabel = screen.getByText(/password/i);
    expect(passwordLabel).toBeInTheDocument();
});

test('renders a button element', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /OK/i });
    expect(button).toBeInTheDocument();
});
