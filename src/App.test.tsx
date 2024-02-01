import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("Testing default App state", () => {
  beforeEach(() => {
    render(<App />)
  });

  it('should show a loading message', async () => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
  });
});
