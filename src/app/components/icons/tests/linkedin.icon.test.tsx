import React from 'react';
import { describe, it, afterEach,expect } from 'vitest';
import { cleanup, render, } from '@testing-library/react';
import LinkedInIcon from '../linkedin';

describe('LinkedInIcon', () => {
  afterEach(cleanup);

  it('should render the icon', () => {
    const { container } = render(<LinkedInIcon />);
    expect(container).toBeDefined();
  });
});