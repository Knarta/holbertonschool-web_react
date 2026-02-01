import { render, screen } from '@testing-library/react';
import App from './App';

test('renders School Dashboard h1', () => {
    render(<App />);
    const h1 = screen.getByText('School Dashboard');
    expect(h1).toBeInTheDocument();
});

test('renders correct text content p elements app-body and app-footer', () => {
    render(<App />);
    const Body_p = screen.getByText(/./, { selector: 'p' });
    expect(Body_p).toBeInTheDocument();
    const Footer_p = screen.getByText(/./, { selector: 'p' });
    expect(Footer_p).toBeInTheDocument();
});

test('renders img is element', () => {
    render(<App />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
});
