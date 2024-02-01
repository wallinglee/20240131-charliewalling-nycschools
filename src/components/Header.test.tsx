import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe("Testing Header component", () => {
  beforeEach(() => {
    render(<Header numberOfSchools={440} />)
  });

  it('should show the proper school header', async () => {
    expect(screen.getByText(/NYC Schools/i)).toBeInTheDocument()
  });

  it('should show the correct number of schools', async () => {
    expect(screen.getByText(/440/i)).toBeInTheDocument()
  });
});
