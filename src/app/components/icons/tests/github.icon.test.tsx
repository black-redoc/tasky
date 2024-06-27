import React from 'react';
import { describe, it, afterEach, expect } from 'vitest';
import { cleanup, render, } from '@testing-library/react';
import GitHubIcon from '../github';

describe('GitHubIcon', () => {
  afterEach(cleanup);

  it('should render the icon', () => {
    const { container } = render(<GitHubIcon />);
    expect(container).toBeDefined();
  });
});